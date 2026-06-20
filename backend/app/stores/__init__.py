"""
Data stores — database access layer (one store per entity/table).

Naming: `messages` is a MessageStore instance, not a Git repo.
Services call stores; stores talk to Supabase Postgres.
"""
