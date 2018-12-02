FROM ubuntu:14.04

# installing [software-properties-common] so that we can use [apt-add-repository] to install Java8
RUN apt-get update -y \
&&  apt-get install software-properties-common -y \
&&  apt-add-repository ppa:webupd8team/java -y \
&&  apt-get update -y \
# automatically agreeing on oracle license agreement [for installing java]
&&  echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections \
&&  echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections \
# installing java, scala and supervisor
&&  apt-get install -y oracle-java8-installer \
    scala \
    python2.7 \
    supervisor

ENV PYSPARK_PYTHON python2.7
ENV PATH $PATH:$SPARK_HOME/bin

# downloading & unpacking Spark 2.4.0
RUN wget http://httpd-mirror.sergal.org/apache/spark/spark-2.4.0/spark-2.4.0-bin-hadoop2.7.tgz \
&&  tar -xzf spark-2.4.0-bin-hadoop2.7.tgz \
&&  mv spark-2.4.0-bin-hadoop2.7 /opt/spark

# adding conf files
COPY master.conf /opt/conf/master.conf
COPY master-web.conf /opt/conf/master-web.conf 
COPY master-all.conf /opt/conf/master-all.conf 
COPY slave.conf /opt/conf/slave.conf 

############################
# ADDING REST SERVICE
############################

# Install Node
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Copy web service
WORKDIR /app
COPY package.json /app
COPY index.js /app
RUN cd /app && npm install
ENV PATH /app/node_modules/.bin:$PATH

# Expose port 3001 for web service
EXPOSE 3001

# Expose port 8080 for spark master UI
EXPOSE 8080
