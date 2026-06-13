"""
Configuration Management for Zelos Backend

This file loads environment variables from .env and makes them
available throughout the application as a single settings object.

Why Pydantic Settings?
- Type validation (ensures API keys are strings, not accidentally numbers)
- Autocomplete in IDE
- Easy to test (can override settings in tests)
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Application Settings
    
    These values are automatically loaded from environment variables.
    Pydantic will look for:
    1. Environment variables (e.g., SUPABASE_URL)
    2. .env file in the backend directory
    """
    
    # ============================================
    # APP SETTINGS
    # ============================================
    APP_NAME: str = "Zelos"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False  # Set to True in development
    
    # ============================================
    # DATABASE (Supabase)
    # ============================================
    SUPABASE_URL: str  # Required - no default
    SUPABASE_KEY: str  # anon key (for client operations)
    SUPABASE_SERVICE_KEY: str  # service_role key (bypasses RLS)
    
    # ============================================
    # AI / LLM
    # ============================================
    OPENAI_API_KEY: str  # Required
    ANTHROPIC_API_KEY: Optional[str] = None  # Optional fallback
    
    # ============================================
    # REDIS (for background jobs)
    # ============================================
    REDIS_URL: str = "redis://localhost:6379"
    
    # ============================================
    # JWT / AUTH
    # ============================================
    SECRET_KEY: str  # For signing tokens
    ALGORITHM: str = "HS256"  # JWT algorithm
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # ============================================
    # STRIPE (payments - optional for V1)
    # ============================================
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    
    # ============================================
    # CORS (which domains can call our API)
    # ============================================
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ]
    
    class Config:
        """
        Pydantic configuration
        
        env_file: Tells Pydantic to load from .env file
        case_sensitive: Environment variable names must match exactly
        """
        env_file = ".env"
        case_sensitive = True


# Create a single settings instance
# This is imported by other files: from app.core.config import settings
settings = Settings()