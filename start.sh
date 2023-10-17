cd uniconv
sudo systemctl stop nginx.service
#sudo php artisan migrate:fresh --seed
sudo php artisan serve --port 80
cd ..

cd uniconvclient
#rm -rf ./dist/
#ng build --prod --configuration=production --base-href="/"
##ng build --configuration=postdev --sourceMap --base-href="/"
ng serve
cd ..

cd uniconv-mock-idp
#npm install fake-sso-idp
node start.js
cd ..

#http://localhost:4200/

#/etc/ssl/openssl.cnf
#providers = provider_sect //uncomment

#export OPENSSL_CONF=/dev/null

sudo chgrp -R www-data ./public;
sudo chmod -R 775 ./public;

sudo chgrp -R www-data ./storage;
sudo chmod -R 775 ./storage;

php artisan cache:clear;
php artisan route:clear;
php artisan config:clear;
php artisan view:clear;
