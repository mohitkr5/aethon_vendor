FROM node:16-alpine3.16

USER root

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]