"""
Zelos Backend API - Main Application

This is the entry point for the FastAPI application.
When you run 'uvicorn app.main:app', this file starts the server.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.database import db
from contextlib import asynccontextmanager
import time


# ============================================
# LIFESPAN CONTEXT MANAGER (Modern approach)
# ============================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events
    
    This replaces the old @app.on_event("startup") and @app.on_event("shutdown")
    
    Code before 'yield' runs on startup
    Code after 'yield' runs on shutdown
    """
    # ===== STARTUP =====
    print("=" * 50)
    print("🚀 Zelos API Starting...")
    print(f"📍 Environment: {'Development' if settings.DEBUG else 'Production'}")
    print(f"🗄️  Database: {settings.SUPABASE_URL}")
    print("=" * 50)
    
    # Test database connection
    if db.health_check():
        print("✅ Database connection: OK")
    else:
        print("❌ Database connection: FAILED")
        print("⚠️  Server will start but database operations will fail!")
    
    yield  # Server is running here
    
    # ===== SHUTDOWN =====
    print("=" * 50)
    print("👋 Zelos API Shutting down...")
    print("=" * 50)


# ============================================
# CREATE FASTAPI APP
# ============================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered task paralysis companion",
    lifespan=lifespan,  # Pass lifespan context manager
    # Disable docs in production for security
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)


# ============================================
# MIDDLEWARE (Runs on every request)
# ============================================

# CORS - Allow frontend to call our API
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """
    Adds a custom header showing how long the request took
    """
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# ============================================
# ROOT ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """
    Root endpoint - Shows API is alive
    """
    return {
        "message": "Zelos API is running! 🚀",
        "version": settings.APP_VERSION,
        "docs": "/docs" if settings.DEBUG else "Disabled in production",
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    db_healthy = db.health_check()
    
    return {
        "status": "healthy" if db_healthy else "unhealthy",
        "database": "connected" if db_healthy else "disconnected",
        "version": settings.APP_VERSION,
    }


# ============================================
# ERROR HANDLERS
# ============================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Catches any unhandled errors
    """
    if settings.DEBUG:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "detail": str(exc),
                "type": type(exc).__name__,
            }
        )
    else:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "message": "Something went wrong. Please try again later."
            }
        )


# ============================================
# API ROUTES (Will add later)
# ============================================

# TODO: Add API v1 routes
# from app.api.v1 import router as api_router
# app.include_router(api_router, prefix="/api/v1")