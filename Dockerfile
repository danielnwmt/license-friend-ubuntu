FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g bun
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
RUN bun run build || npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist/client ./client
EXPOSE 3000
CMD ["serve", "-s", "client", "-l", "3000"]
