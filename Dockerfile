#FROM node:fermium-alpine as dev
#RUN apk --update add postgresql-client
#
#WORKDIR .
#COPY package*.json ./
#
#RUN npm install
#
#RUN npm install glob rimraf
#
#COPY . .
#
#COPY wait-for-postgres.sh .
#RUN chmod +x /wait-for-postgres.sh
#
#COPY docker-entrypoint.sh .
#RUN chmod +x /docker-entrypoint.sh
#
#RUN npm run build
#
#FROM node:fermium-alpine as prod
#RUN apk --update add postgresql-client
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${MODE}
#
#WORKDIR .
#
#COPY package*.json ./
#
#RUN npm install --production
#
#COPY . .
#
#COPY --from=dev ./dist ./dist
#
#COPY wait-for-postgres.sh .
#RUN chmod +x /wait-for-postgres.sh
#
#COPY docker-entrypoint.sh .
#RUN chmod +x /docker-entrypoint.sh
#



FROM node:12-alpine

RUN apk --update add postgresql-client

# Create app directory, this is in our container/in our image
WORKDIR /matteo/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build

RUN chmod +x wait-for-postgres.sh
RUN chmod +x docker-entrypoint.sh

EXPOSE 8080
#CMD [ "node", "dist/src/main" ]