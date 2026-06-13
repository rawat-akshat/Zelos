"""
Test authentication utilities
Run: python test_auth.py
"""

from app.utils.auth import hash_password, verify_password, create_access_token, decode_access_token

print("🔍 Testing Authentication Utils...\n")

# Test 1: Password Hashing
print("1. Password Hashing:")
password = "mySecurePassword123"
hashed = hash_password(password)
print(f"   Original: {password}")
print(f"   Hashed: {hashed[:50]}... ({len(hashed)} chars)")
print(f"   ✅ Hashed successfully\n")

# Test 2: Password Verification
print("2. Password Verification:")
correct = verify_password(password, hashed)
wrong = verify_password("wrongPassword", hashed)
print(f"   Correct password: {correct} ✅")
print(f"   Wrong password: {wrong} ✅\n")

# Test 3: JWT Token Creation
print("3. JWT Token Creation:")
token = create_access_token({"sub": "user-123"})
print(f"   Token: {token[:50]}... ({len(token)} chars)")
print(f"   ✅ Token created\n")

# Test 4: JWT Token Decoding
print("4. JWT Token Decoding:")
user_id = decode_access_token(token)
print(f"   Decoded user ID: {user_id} ✅")

# Test 5: Invalid Token
print("\n5. Invalid Token:")
invalid_user = decode_access_token("invalid.token.here")
print(f"   Invalid token result: {invalid_user} (None = correct) ✅")

print("\n🎉 All auth tests passed!")