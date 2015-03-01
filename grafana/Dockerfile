# This file creates a container that runs InfluxDB
#
# Author: Paul Czarkowski
# Date: 02/28/2015

FROM factorish/ubuntu-trusty
MAINTAINER Paul Czarkowski "paul@paulcz.net"

# nginx
RUN \
  apt-get -yq update && \
  apt-get -yqq install nginx

# grafana
RUN \
  wget -q -O /tmp/grafana.tgz http://grafanarel.s3.amazonaws.com/grafana-1.9.1.tar.gz && \
  cd /app && \
  tar xzvf /tmp/grafana.tgz && \
  ln -s /app/grafana-1.9.1 /app/grafana && \
  rm -f /app/grafana/config.sample.js && \
  rm /tmp/grafana.tgz

# Expose ports.
EXPOSE 8080

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["/app/bin/boot"]

ADD . /app

RUN \
  useradd -d /app -c 'application' -s '/bin/false' app && \
  chmod +x /app/bin/* && \
  chown -R app:app /app && \
  rm -f /etc/nginx/sites-enabled/*
