FROM node:22-bullseye
#crear workdir
WORKDIR /usr/src/app

COPY . .

ENV PORT 3000

EXPOSE 3000

CMD ["sh"]