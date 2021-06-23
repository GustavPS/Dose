FROM node:16-alpine
RUN apk add  --no-cache ffmpeg

ENV NODE_ENV=production

# Create app directory
WORKDIR .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
