#!/bin/bash
git --work-tree=/app/sandboxes/git/frontend --git-dir=/repos/frontend.git checkout production
cd /app/sandboxes/git/frontend
npm install
ng build --prod --aot
echo "Successully Built"
rm -r /app/www/root/*
cp -r /app/sandboxes/git/frontend/dist/* /app/www/root/
echo "Done !!"
