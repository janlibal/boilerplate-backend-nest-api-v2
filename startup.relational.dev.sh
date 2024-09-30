#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
yarn run migrate:prod
yarn run seed:prod
yarn run start:prod