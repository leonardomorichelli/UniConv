cd uniconv
./clear.sh
sudo systemctl stop nginx.service
#php artisan migrate:fresh --seed
sudo php artisan serve --port 80
cd ..

cd uniconvclient
#rm -rf ./dist/
#ng build --prod --configuration=production --base-href="/"
#ng build --prod --configuration=preprod --base-href="/"
ng serve
cd ..

cd uniconv-mock-idp
#npm install fake-sso-idp
node start.js
cd ..

#http://localhost:4200/

sudo chgrp -R www-data ./public;
sudo chmod -R 775 ./public;

sudo chgrp -R www-data ./storage;
sudo chmod -R 775 ./storage;

php artisan cache:clear;
php artisan route:clear;
php artisan config:clear;
php artisan view:clear;
