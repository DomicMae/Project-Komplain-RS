#!/bin/bash

git pull
docker build -t web-gr-complaint:latest .
cd ..
docker compose down
docker compose up -d