# build environment
FROM node:16-alpine3.14 as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# production environment
FROM nginx as production
WORKDIR /usr/share/nginx/html
# Copy built assets from builder
COPY --from=builder /app/build .
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]