#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
#yarn run migrate:prod
#yarn run seed:prod
#yarn run prisma:generate

#yarn run rebuild
#---yarn run migrate:deploy
#---yarn run seed:prod
yarn run start:prod

#RUN npx prisma generate
#RUN yarn run rebuild