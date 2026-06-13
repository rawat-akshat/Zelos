"""
Authentication Utilities

Helper functions for:
- Password hashing (secure storage)
- JWT token creation/verification
- User authentication

Security notes:
- Passwords are NEVER stored in plain text
- We use bcrypt for hashing (industry standard)
- JWT tokens expire after 30 minutes
"""

from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings


# ============================================
# PASSWORD HASHING
# ============================================

# Create password context (bcrypt algorithm)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Hash a plain text password
    
    Uses bcrypt algorithm with automatic salt generation
    
    Args:
        password: Plain text password from user
        
    Returns:
        Hashed password (safe to store in database)
        
    Example:
        >>> hash_password("mypassword123")
        '$2b$12$KIXxFz...' (60 characters)
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against its hash
    
    Args:
        plain_password: Password user just entered
        hashed_password: Stored hash from database
        
    Returns:
        True if password matches, False otherwise
        
    Example:
        >>> verify_password("mypassword123", stored_hash)
        True
    """
    return pwd_context.verify(plain_password, hashed_password)


# ============================================
# JWT TOKEN MANAGEMENT
# ============================================

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token
    
    JWT = JSON Web Token (industry standard for API authentication)
    
    Token contains:
    - User ID
    - Expiration time
    - Signature (prevents tampering)
    
    Args:
        data: Dictionary to encode (usually {"sub": user_id})
        expires_delta: How long token is valid (default: 30 minutes)
        
    Returns:
        JWT token string
        
    Example:
        >>> create_access_token({"sub": "user-id-123"})
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    """
    to_encode = data.copy()
    
    # Set expiration time
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    
    # Create and return token
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    
    return encoded_jwt


def decode_access_token(token: str) -> Optional[str]:
    """
    Decode and verify a JWT token
    
    Args:
        token: JWT token string
        
    Returns:
        User ID if token is valid, None otherwise
        
    Example:
        >>> decode_access_token("eyJhbGciOiJIUzI1...")
        'user-id-123'
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        
        if user_id is None:
            return None
            
        return user_id
        
    except JWTError:
        return None