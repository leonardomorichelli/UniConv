sudo chgrp -R www-data ./public;
sudo chmod -R 775 ./public;

sudo chgrp -R www-data ./storage;
sudo chmod -R 775 ./storage;

php artisan cache:clear;
php artisan route:clear;
php artisan config:clear;
php artisan view:clear;
