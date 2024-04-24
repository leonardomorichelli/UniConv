
sudo rm -rf ./storage;
mkdir ./storage;

cd ./storage;
mkdir ./backups;
mkdir ./logs;
mkdir ./app;
mkdir ./app/public;
mkdir ./framework;
mkdir ./framework/cache;
mkdir ./framework/cache/data;
mkdir ./framework/sessions;
mkdir ./framework/testing;
mkdir ./framework/views;

cat <<EOF | sudo tee ./backups/.gitignore ./logs/.gitignore
*
!.gitignore
EOF

cat <<EOF | sudo tee ./app/.gitignore
*
!public/
!.gitignore
EOF

cat <<EOF | sudo tee ./app/public/.gitignore 
*
!.gitignore
EOF

cat <<EOF | sudo tee ./framework/.gitignore
config.php
routes.php
schedule-*
compiled.php
services.json
events.scanned.php
routes.scanned.php
down
!.gitignore
EOF

cat <<EOF | sudo tee ./framework/cache/.gitignore ./framework/cache/data/.gitignore ./framework/sessions/.gitignore ./framework/testing/.gitignore ./framework/views/.gitignore
*
!.gitignore
EOF

cd ..

sudo chown -R uniconv:www-data ./storage;
sudo chmod -R 775 ./storage;
