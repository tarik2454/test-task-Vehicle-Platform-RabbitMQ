FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY .husky/install.mjs ./.husky/install.mjs
RUN HUSKY=0 npm ci --no-audit --no-fund && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
