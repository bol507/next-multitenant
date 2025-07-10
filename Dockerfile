FROM node:22-bullseye
#crear workdir
WORKDIR /usr/src/app
# Install pnpm globally
RUN npm install -g pnpm

COPY . .

RUN pnpm install

ENV PORT 3000

EXPOSE 3000

CMD ["sh"]