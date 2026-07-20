"""Backend API tests for Art Creation site.

Covers:
- Root health
- POST /api/enquiries (valid + invalid)
- GET /api/enquiries (sort order)
- GET /api/stats
"""
import os
import time
import uuid
from datetime import datetime, timezone, timedelta

import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://retail-branding-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def auth_token():
    """Seed a session directly in Mongo per /app/auth_testing.md. GET /api/enquiries is now auth-gated."""
    mc = MongoClient(MONGO_URL)
    db = mc[DB_NAME]
    user_id = f"test-user-{uuid.uuid4().hex[:12]}"
    token = f"test_session_{uuid.uuid4().hex}"
    db.users.insert_one({
        "user_id": user_id,
        "email": f"test.regression.{uuid.uuid4().hex[:6]}@example.com",
        "name": "TEST Regression",
        "picture": "",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    yield token
    db.users.delete_one({"user_id": user_id})
    db.user_sessions.delete_many({"user_id": user_id})
    mc.close()


# ---- Health ----
def test_root_health(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert "Art Creation" in data.get("message", "")


# ---- POST /api/enquiries ----
def test_create_enquiry_valid(client):
    payload = {
        "name": "TEST_User_A",
        "company": "TEST_Co",
        "email": "test_a@example.com",
        "phone": "+91-9999999999",
        "service": "Retail Store Branding",
        "city": "Kolkata",
        "message": "TEST_MSG_A please contact us about a project.",
    }
    r = client.post(f"{API}/enquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    for f in ("id", "name", "email", "message", "created_at"):
        assert f in data, f"missing {f} in {data}"
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["message"] == payload["message"]
    assert isinstance(data["id"], str) and len(data["id"]) > 0


def test_create_enquiry_missing_name(client):
    r = client.post(f"{API}/enquiries", json={"name": "", "email": "x@x.com", "message": "hello"})
    assert r.status_code == 400


def test_create_enquiry_missing_email(client):
    r = client.post(f"{API}/enquiries", json={"name": "A", "email": "", "message": "hello"})
    assert r.status_code == 400


def test_create_enquiry_missing_message(client):
    r = client.post(f"{API}/enquiries", json={"name": "A", "email": "x@x.com", "message": ""})
    assert r.status_code == 400


def test_create_enquiry_missing_field_422(client):
    # totally missing required key => pydantic 422
    r = client.post(f"{API}/enquiries", json={"email": "x@x.com", "message": "hello"})
    assert r.status_code in (400, 422)


# ---- GET /api/enquiries - order newest first (auth-gated) ----
def test_list_enquiries_sorted_desc(client, auth_token):
    tag_a = f"TEST_ORDER_{uuid.uuid4().hex[:8]}_A"
    tag_b = f"TEST_ORDER_{uuid.uuid4().hex[:8]}_B"
    r1 = client.post(f"{API}/enquiries", json={
        "name": tag_a, "email": "order_a@example.com", "message": tag_a
    })
    assert r1.status_code == 200
    time.sleep(1.1)
    r2 = client.post(f"{API}/enquiries", json={
        "name": tag_b, "email": "order_b@example.com", "message": tag_b
    })
    assert r2.status_code == 200

    r = client.get(f"{API}/enquiries", headers={"Authorization": f"Bearer {auth_token}"})
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list) and len(items) >= 2

    # Find indices of the two records we inserted
    idx_a = next((i for i, it in enumerate(items) if it.get("message") == tag_a), None)
    idx_b = next((i for i, it in enumerate(items) if it.get("message") == tag_b), None)
    assert idx_a is not None and idx_b is not None, "inserted records not found"
    # Newer (B) should appear before older (A)
    assert idx_b < idx_a, f"expected newest first: idx_b={idx_b}, idx_a={idx_a}"

    # verify _id not leaked
    assert "_id" not in items[0]


# ---- GET /api/stats ----
def test_stats(client):
    r = client.get(f"{API}/stats")
    assert r.status_code == 200
    data = r.json()
    for k in ("projects_delivered", "retail_partners", "cities_served", "years_experience", "enquiries_received"):
        assert k in data
        assert isinstance(data[k], int)
    assert data["enquiries_received"] >= 0
