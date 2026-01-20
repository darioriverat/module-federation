FROM node:latest

ENV NODE_VERSION=20

USER node

COPY ./entrypoint.sh /usr/bin/entrypoint.sh
WORKDIR /home/node/app

ENTRYPOINT [ "entrypoint.sh" ]