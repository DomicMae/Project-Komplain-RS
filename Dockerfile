# Use the official PHP image
FROM php:8.2-cli

# Set the working directory in the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copy the Laravel application files to the working directory
COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1

# Run Composer Update
RUN composer update

# Run Composer to install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Run npm to install JavaScript dependencies
RUN npm install

# Build the production assets
RUN npm run build

# Copy the environment file
COPY .env .env

# Expose port 80
EXPOSE 80

# Start the Apache server and serve the Laravel application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]