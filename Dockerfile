FROM node:latest
WORKDIR /CMPSC487W-GroupProject
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]