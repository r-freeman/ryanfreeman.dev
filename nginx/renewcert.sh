#!/bin/sh

cd /home/pi/ryanfreeman.dev/
docker-compose down

sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /home/pi/.secrets/cloudflare.ini -d *.ryanfreeman.dev --preferred-challenges dns-01

sudo su <<HERE
cd /home/pi/ryanfreeman.dev/nginx
zip -r lib_letsencrypt.zip /var/lib/letsencrypt/
zip -r etc_letsencrypt.zip /etc/letsencrypt/
HERE

docker-compose build
docker-compose up -d