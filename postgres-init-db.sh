#!/bin/bash
set -e

createdb -U postgres -T template0 car_sharing_container_production
pg_restore --dbname=car_sharing_container_production --verbose ../backup/dump.tar
