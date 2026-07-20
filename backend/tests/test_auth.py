"""Auth + protected route tests for Art Creation site.

Uses MongoDB seeding per /app/auth_testing.md to avoid completing the real
Emergent OAuth flow. Seeds a users + user_sessions document, then verifies:
- Unauth cases return 401
- POST /api/auth/session with invalid session_id -> 401
- Bearer token works for GET /api/auth/me and GET /api/enquiries
- POST /api/auth/logout invalidates the session (subsequent /auth/me -> 401)
- Public POST /api/enquiries still works
- End-to-end: enquiry created via public POST appears in authed list

Cleans up all seeded data at end of module.
"""
import os
import uuid
from datetime import datetime, timezone, timedelta

import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")


# ---- Fixtures ----
@pytest.fixture(scope="module")
def mongo_db():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    c.close()


@pytest.fixture(scope="module")
def seeded(mongo_db):
    """Seed a test user + valid session. Cleanup at teardown."""
    user_id = f"test-user-{uuid.uuid4().hex[:12]}"
    session_token = f"test_session_{uuid.uuid4().hex}"
    email = f"test.user.{uuid.uuid4().hex[:8]}@example.com"

    mongo_db.users.insert_one({
        "user_id": user_id,
        "email": email,
        "name": "TEST Auth User",
        "picture": "https://via.placeholder.com/150",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    mongo_db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    yield {"user_id": user_id, "session_token": session_token, "email": email}

    # Teardown
    mongo_db.users.delete_one({"user_id": user_id})
    mongo_db.user_sessions.delete_many({"user_id": user_id})


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    return s


# ---- Unauth cases ----
def test_me_unauthenticated_returns_401(client):
    r = client.get(f"{API}/auth/me")
    assert r.status_code == 401, r.text


def test_enquiries_get_unauthenticated_returns_401(client):
    r = client.get(f"{API}/enquiries")
    assert r.status_code == 401, r.text


def test_enquiries_get_bad_token_returns_401(client):
    r = client.get(
        f"{API}/enquiries",
        headers={"Authorization": "Bearer this_is_not_a_real_token"},
    )
    assert r.status_code == 401


def test_session_create_with_invalid_session_id(client):
    # Deliberately invalid — we do NOT hit the real Google flow
    r = client.post(
        f"{API}/auth/session",
        json={"session_id": "obviously-invalid-session-id-xyz"},
    )
    assert r.status_code == 401, r.text


def test_session_create_missing_session_id(client):
    r = client.post(f"{API}/auth/session", json={})
    assert r.status_code == 400


# ---- Public POST /api/enquiries still works ----
def test_public_post_enquiry_still_works(client):
    payload = {
        "name": "TEST_AUTH_A",
        "company": "TEST_Co",
        "email": "test_auth_a@example.com",
        "phone": "+91-9999999999",
        "service": "Retail Store Branding",
        "city": "Kolkata",
        "message": "TEST_AUTH_MSG_A",
    }
    r = client.post(f"{API}/enquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["message"] == payload["message"]
    assert "id" in data


# ---- Bearer token flows ----
def test_me_with_bearer_returns_user(client, seeded):
    r = client.get(
        f"{API}/auth/me",
        headers={"Authorization": f"Bearer {seeded['session_token']}"},
    )
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["user_id"] == seeded["user_id"]
    assert data["email"] == seeded["email"]
    assert data["name"] == "TEST Auth User"
    assert "_id" not in data  # Mongo _id must not leak


def test_enquiries_with_bearer_returns_list(client, seeded):
    # Ensure at least one enquiry exists
    tag = f"TEST_AUTH_LIST_{uuid.uuid4().hex[:8]}"
    client.post(f"{API}/enquiries", json={
        "name": tag, "email": "list@example.com", "message": tag
    })

    r = client.get(
        f"{API}/enquiries",
        headers={"Authorization": f"Bearer {seeded['session_token']}"},
    )
    assert r.status_code == 200, r.text
    items = r.json()
    assert isinstance(items, list)
    assert any(it.get("message") == tag for it in items)
    if items:
        assert "_id" not in items[0]


def test_logout_invalidates_session(client, mongo_db):
    """Create a fresh session, log out with it, verify /auth/me 401."""
    user_id = f"test-user-{uuid.uuid4().hex[:12]}"
    token = f"test_session_logout_{uuid.uuid4().hex}"
    email = f"test.user.logout.{uuid.uuid4().hex[:6]}@example.com"

    mongo_db.users.insert_one({
        "user_id": user_id,
        "email": email,
        "name": "TEST Logout User",
        "picture": "",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    mongo_db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    try:
        # Sanity: token works
        r1 = client.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert r1.status_code == 200, r1.text

        # Logout
        r2 = client.post(
            f"{API}/auth/logout",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert r2.status_code == 200

        # Session should be gone from DB
        assert mongo_db.user_sessions.find_one({"session_token": token}) is None

        # /auth/me now 401
        r3 = client.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert r3.status_code == 401
    finally:
        mongo_db.users.delete_one({"user_id": user_id})
        mongo_db.user_sessions.delete_many({"user_id": user_id})


def test_expired_session_returns_401(client, mongo_db):
    user_id = f"test-user-{uuid.uuid4().hex[:12]}"
    token = f"test_session_exp_{uuid.uuid4().hex}"
    mongo_db.users.insert_one({
        "user_id": user_id,
        "email": f"test.exp.{uuid.uuid4().hex[:6]}@example.com",
        "name": "TEST Expired",
        "picture": "",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    mongo_db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    try:
        r = client.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 401
    finally:
        mongo_db.users.delete_one({"user_id": user_id})
        mongo_db.user_sessions.delete_many({"user_id": user_id})
