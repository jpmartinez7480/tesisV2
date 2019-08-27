FROM mariadb

#EXPOSE 3306

#WORKDIR /app
COPY . .
ADD repo.sql /docker-entrypoint-initdb.d/dump.sql

#RUN mysql -u root -ppass < main_server/database/dump.sql
#RUN mysql -u root -ppass

