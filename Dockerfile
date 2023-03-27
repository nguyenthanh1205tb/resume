FROM node:16-alpine as Builder

EXPOSE 3000
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

CMD ["yarn", "start"]

