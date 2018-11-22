FROM node
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN apt-get install -y supervisor

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN cd /app && npm install
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

RUN cd /app && ls

# Adding conf files
COPY app.conf /opt/conf/app.conf

# Expose port 3000
EXPOSE 3000

