"""
Quick test to verify configuration loads correctly
Run: python test_config.py
"""

from app.core.config import settings

print("🔍 Testing Configuration...")
print(f"✅ App Name: {settings.APP_NAME}")
print(f"✅ Debug Mode: {settings.DEBUG}")
print(f"✅ Supßabase URL: {settings.SUPABASE_URL[:30]}...")  # First 30 chars
print(f"✅ OpenAI Key: {'✓ Set' if settings.OPENAI_API_KEY else '✗ Missing'}")
print(f"✅ JWT Secret: {'✓ Set' if settings.SECRET_KEY else '✗ Missing'}")
print("\n🎉 Configuration loaded successfully!")