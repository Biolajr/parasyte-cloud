FROM node:20-alpine3.21 AS builder
WORKDIR /build
COPY index.html .

FROM nginx:1.27.5-alpine3.21

# Upgrade all packages to get latest security patches
RUN apk upgrade --no-cache

RUN addgroup -g 1001 -S parasyte && \
    adduser -u 1001 -S parasyte -G parasyte

RUN rm -rf /usr/share/nginx/html/* && \
    rm -f /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/index.html /usr/share/nginx/html/index.html

RUN chown -R parasyte:parasyte /usr/share/nginx/html && \
    chown -R parasyte:parasyte /var/cache/nginx && \
    chown -R parasyte:parasyte /var/log/nginx && \
    chown -R parasyte:parasyte /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R parasyte:parasyte /var/run/nginx.pid

USER parasyte
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
