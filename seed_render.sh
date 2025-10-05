#!/bin/bash
DB_URL="postgresql://health_tracker_kc4o_user:lCxy2aAMTeOJmXL3OlT8RVyKNurprDns@dpg-d3gkn7nfte5s73c8iiv0-a.oregon-postgres.render.com/health_tracker_kc4o"

psql "$DB_URL" -f db/schema.sql
psql "$DB_URL" -f db/seeds/01_users.sql
psql "$DB_URL" -f db/seeds/02_affirmations.sql
psql "$DB_URL" -f db/seeds/03_health_tips.sql
psql "$DB_URL" -f db/seeds/04_recipes.sql
echo "🌱 Render database seeded."