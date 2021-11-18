FROM node:12.13-alpine
COPY package*.json ./
COPY . .
RUN npm run build

CMD ["node", "dist/main"]
