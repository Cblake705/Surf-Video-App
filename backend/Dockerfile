# Use your preferred Node version
FROM node:18-alpine
 
# where in the container your code will live
WORKDIR /app

# install dependencies first (leveraging Docker cache)
COPY package*.json ./
RUN npm install

# copy the rest of your backend code
COPY . .

# compile (if using TS)
RUN npm run build

# expose the port you configured (e.g. 4000)
EXPOSE 4000

# start your NestJS app
CMD ["npm", "run", "start:prod"]