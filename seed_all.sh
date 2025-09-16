#!/bin/bash
psql -U jasmi -d health_tracker -f db/schema.sql
psql -U jasmi -d health_tracker -f db/seeds/01_encouragements.sql
psql -U jasmi -d health_tracker -f db/seeds/02_affirmations.sql
psql -U jasmi -d health_tracker -f db/seeds/03_health_tips.sql
echo "🌱 Database seeded."