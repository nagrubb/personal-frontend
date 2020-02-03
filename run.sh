#!/usr/bin/env bash
docker rm -f website; docker build -t website . && docker run -p 8000:80 --name website -t website
