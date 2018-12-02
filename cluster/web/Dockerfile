FROM node

RUN npm install pm2 -g

WORKDIR /app
COPY package.json /app
RUN cd /app && npm install
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

# Expose port 3000
EXPOSE 3000

CMD ["pm2-runtime", "index.js"]
