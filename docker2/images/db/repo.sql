/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE USER 'usach'@'localhost' IDENTIFIED BY 'usach';

GRANT ALL PRIVILEGES ON * . * TO 'usach'@'localhost';

FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS REPO;

USE REPO;


CREATE TABLE User(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_login VARCHAR(50) NOT NULL,
    password_crypth VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Signals(
    id_signal INTEGER NOT NULL AUTO_INCREMENT,
    name_signal VARCHAR(50) NOT NULL,
    type_signal VARCHAR(50) NOT NULL,
    frecuency VARCHAR(10),
    duration VARCHAR(50) NOT NULL,
    date_upload TIMESTAMP NOT NULL,
    upload_for INTEGER NOT NULL,
    PRIMARY KEY(id_signal),
    FOREIGN KEY (upload_for) REFERENCES User(id)
);


insert into User(email,name,password_login, password_crypth) values ('jp1@jp.cl','JuanPablo','1234',"abcd");
insert into User(email,name,password_login, password_crypth) values ('jp2@jp.cl','juanpablo','4321',"dcba");

