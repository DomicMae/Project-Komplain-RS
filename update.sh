#!/bin/bash

git pull
docker build -t web-gr-complaint:latest .
docker stop gr-complaint-container && docker rm gr-complaint-container
docker run -d --name gr-complaint-container -p 80:80 web-gr-complaint:latest