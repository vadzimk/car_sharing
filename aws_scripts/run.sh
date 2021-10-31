#!/bin/bash
cd /home/ubuntu/applications/car_sharing || exit
docker-compose -f docker-compose.prod.yml up -d