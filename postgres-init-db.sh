#!/bin/bash
set -e

createdb -U $POSTGRES_USER -T template0 $DATABASE_NAME
pg_restore --dbname=$DATABASE_NAME --verbose ../backup/dump.tar
