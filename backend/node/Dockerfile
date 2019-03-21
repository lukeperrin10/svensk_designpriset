FROM debian:squeeze
WORKDIR /var
RUN echo "deb http://archive.debian.org/debian/ squeeze main non-free contrib" > /etc/apt/sources.list && \
    apt-get install debian-archive-keyring && \
    apt-get update && \
    apt-get install -y --force-yes wget && \
    wget --no-check-certificate https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz && \
    tar -xf node-v10.15.3-linux-x64.tar.xz && cd node-v10.15.3-linux-x64 && \
    ln -s /var/node-v10.15.3-linux-x64/bin/npm /usr/bin/npm && \
    ln -s /var/node-v10.15.3-linux-x64/bin/node /usr/bin/node && \
    ln -s /var/node-v10.15.3-linux-x64/bin/npx /usr/bin/npx && \
    mkdir app
WORKDIR /var/app
CMD [ "node", "server.js" ]