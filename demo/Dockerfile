FROM ghcr.io/alwatr/node:21.7.1 as builder

RUN apk add --no-cache git;
RUN set -ex; corepack enable;

COPY . .

RUN set -eux; \
  yarn install --immutable; \
  yarn build; \
  ls -lahF .; \
  ls -RlahF /app/demo;

# ---

FROM ghcr.io/alwatr/nginx-cdn:2.5.0 as nginx
LABEL org.opencontainers.image.base.name="ghcr.io/alwatr/nginx-cdn:2.5.0"

COPY --from=builder /app/demo/dist/ .

RUN pwd; ls -lAhF;

EXPOSE 80
