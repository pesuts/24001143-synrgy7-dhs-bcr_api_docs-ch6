FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG ENV_PRODUCTION
RUN echo "$ENV_PRODUCTION" > .env.production

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start-prod"]
