#!/bin/sh
set -e

python /srv/app/manage.py makemigrations
python /srv/app/manage.py migrate
python /srv/app/manage.py runserver 0.0.0.0:8080 