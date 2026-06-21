"""
Quick test to verify configuration loads correctly
Run: python test_config.py
"""

from app.core.config import settings

print("🔍 Testing Configuration...")
print(f"✅ App Name: {settings.APP_NAME}")
print(f"✅ Debug Mode: {settings.DEBUG}")
print(f"✅ Supabase URL: {settings.SUPABASE_URL[:30]}...")
print(f"✅ LLM Provider: {settings.LLM_PROVIDER}")
print(f"✅ Active Model: {settings.GEMINI_MODEL if settings.LLM_PROVIDER == 'gemini' else settings.OPENAI_MODEL}")
print(f"✅ Gemini Key: {'✓ Set' if settings.GEMINI_API_KEY else '✗ Not set (required for v1)'}")
if settings.LLM_PROVIDER == "openai":
    print(f"✅ OpenAI Key: {'✓ Set' if settings.OPENAI_API_KEY else '✗ Not set'}")
print(f"✅ JWT Secret: {'✓ Set' if settings.SECRET_KEY else '✗ Missing'}")
print("\n🎉 Configuration loaded successfully!")
