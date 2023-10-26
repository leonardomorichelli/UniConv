sudo chgrp -R www-data ./public;
sudo chmod -R 775 ./public;

sudo chgrp -R www-data ./storage;
sudo chmod -R 775 ./storage;

sudo chgrp -R www-data ./vendor/onelogin/php-saml/certs/sp.*
sudo chmod 640 ./vendor/onelogin/php-saml/certs/sp.*

php artisan cache:clear;
php artisan route:clear;
php artisan config:clear;
php artisan view:clear;
