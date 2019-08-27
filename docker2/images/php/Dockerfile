FROM php:7.0-apache

RUN docker-php-ext-install -j$(nproc) mysqli \
	&& docker-php-ext-install pdo_mysql \
	&& docker-php-source delete

EXPOSE 80
CMD ["apache2-foreground"]