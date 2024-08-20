#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
yarn run migrate:dev
yarn run seed:dev