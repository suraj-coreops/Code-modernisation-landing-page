# Build the static site, then serve it with nginx. Two stages so the shipped
# image carries no Node, no node_modules and no source - just the built files.

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Where the console lives. Vite inlines this at BUILD time, so it must be passed
# here rather than set on the running container.
ARG VITE_CONSOLE_URL=http://localhost:8765
ENV VITE_CONSOLE_URL=$VITE_CONSOLE_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
