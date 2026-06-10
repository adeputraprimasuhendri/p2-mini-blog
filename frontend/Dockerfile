FROM node:20-alpine AS base
WORKDIR /src

# Install dependencies
COPY package*.json ./
RUN npm install

# Build aplikasi
COPY . .
RUN npm run build

# Jalankan Nuxt dalam mode production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]