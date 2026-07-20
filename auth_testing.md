# Auth-Gated App Testing Playbook

## Step 1: Create Test User & Session

```bash
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
"
```

## Step 2: Test Backend API

```bash
# /auth/me with bearer token
curl -X GET "$REACT_APP_BACKEND_URL/api/auth/me" \
  -H "Authorization: Bearer <SESSION_TOKEN>"

# Protected enquiries list
curl -X GET "$REACT_APP_BACKEND_URL/api/enquiries" \
  -H "Authorization: Bearer <SESSION_TOKEN>"
```

## Step 3: Browser Testing (Playwright)

Set the cookie before navigating:

```python
await page.context.add_cookies([{
    "name": "session_token",
    "value": SESSION_TOKEN,
    "domain": "retail-branding-hub.preview.emergentagent.com",
    "path": "/",
    "httpOnly": True,
    "secure": True,
    "sameSite": "None"
}])
await page.goto(f"{APP_URL}/admin/enquiries")
```

## Quick Debug

```bash
mongosh --eval "
use('test_database');
db.users.find().limit(2).pretty();
db.user_sessions.find().limit(2).pretty();
"

mongosh --eval "
use('test_database');
db.users.deleteMany({email: /test\\.user\\./});
db.user_sessions.deleteMany({session_token: /test_session/});
"
```

## Checklist
- User doc has custom `user_id` (UUID) — Mongo `_id` never exposed
- Session `user_id` matches user's `user_id`
- All queries use `{"_id": 0}` projection
- Backend queries use `user_id` (not `_id`)
- `/api/auth/me` returns user data (200)
- `/admin/enquiries` loads without redirect when cookie is set
- Unauthenticated request to `/api/enquiries` returns 401

## Success indicators
- `/api/auth/me` → 200 with `{ user_id, email, name, picture }`
- `/admin/enquiries` dashboard loads
- `GET /api/enquiries` returns list when authenticated

## Failure indicators
- 401 Unauthorized when cookie is set → session lookup broken
- Redirect to `/login` when authenticated → frontend ProtectedRoute misconfigured
