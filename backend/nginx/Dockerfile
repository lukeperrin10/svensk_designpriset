FROM nginx

COPY frontend /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html_test
COPY frontend_test /usr/share/nginx/html_test
COPY nginx.conf /etc/nginx/nginx.conf
COPY .htpasswd /etc/nginx/.htpasswd
RUN mkdir /etc/nginx/sites-enabled
COPY sites-enabled/ /etc/nginx/sites-enabled
COPY sites-available/ /etc/nginx/sites-available
#COPY app/static/ /usr/share/nginx/html/static

