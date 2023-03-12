FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "run", "start"]
