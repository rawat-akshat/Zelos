"""
Database Connection Management
This file creates a Supabase client that we'll use throughout the app
to interact with our database.
Why separate file?
- Single source of truth for database connection
- Easy to swap databases later if needed
- Avoids creating multiple connections
"""

from supabase import create_client, Client
from app.core.config import settings
from typing import Optional

class Database:
    """
    Database connection manager
    
    This class provides two Supabase clients:
    1. client (anon key) - For user operations (respects RLS)
    2. admin_client (service key) - For admin operations (bypasses RLS)
    """

    def __init__(self):
        """
        Initialize database connections
        
        We create two clients:
        - Regular client: Uses anon key, respects Row Level Security
        - Admin client: Uses service_role key, bypasses all security
        """
        self._client: Optional[Client] = None
        self._admin_client: Optional[Client] = None
    
    @property
    def client(self) -> Client:
        """
        Get regular Supabase client (anon key)
        
        Use this for:
        - User-facing operations
        - When you want RLS to apply
        - Reading/writing data as a specific user
        
        Example:
            db.client.table('sessions').select('*').eq('user_id', user_id).execute()
        """
        if self._client is None:
            self._client = create_client(
                supabase_url = settings.SUPABASE_URL,
                supabase_key = settings.SUPABASE_KEY #anon key
            )
        return self._client

    @property
    def admin_client(self) -> Client:
        """
        Get admin Supabase client (service_role key)
        
        ⚠️ CAUTION: This bypasses ALL Row Level Security!
        
        Use this ONLY for:
        - Admin operations
        - Background jobs (streak calculations)
        - Server-side tasks that need full access
        
        Example:
            db.admin_client.table('users').update({'streak': 0}).execute()
        """

        if self._admin_client is None:
            self._admin_client = create_client(
                supabase_url=settings.SUPABASE_URL,
                supabase_key=settings.SUPABASE_SERVICE_KEY  # service_role key
            )
        return self._admin_client

    def health_check(self) -> bool:
        """
        Check if database connection is healthy
        
        Returns:
            True if connection works, False otherwise
        """
        try:
            # Use admin_client to bypass RLS for health check
            response = self.admin_client.table('users').select('id').limit(1).execute()
            return True
        except Exception as e:
            print(f"❌ Database health check failed: {e}")
            return False


# Create a single database instance (singleton pattern)
# This is imported everywhere: from app.core.database import db
db = Database()