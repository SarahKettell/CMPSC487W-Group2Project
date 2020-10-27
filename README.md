# CMPSC487W-Group2Project

This is a sample README markdown file for our group git repository.

## Main Components

1. Docker containers for Node.js server and MySQL DB
2. Javascript based app
3. HTML/CSS with Bootstrap
4. GitHub repository

## Documentation
https://nodejs.org/api/documentation.html
https://docs.docker.com/docker-hub/
// for Docker networking
https://github.com/nicolaka/netshoot  
// for javascript database interaction on client side
https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript  

## Docker Commands

App Folder: CMPSC487W-Group2Project

Creating the MySQL DB:
docker run -d \
    --network pizza-parlor-app --network-alias mysql \
    -v pizza-parlor-directory:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=group24ever \
    -e MYSQL_DATABASE=pizza-parlor \
    mysql:5.7

Running with the attached DB:
docker run -dp 3000:3000 \
  -w /pizza-parlor-app -v "$(pwd):/pizza-parlor-app" \
  --network pizza-parlor-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=group24ever \
  -e MYSQL_DB=pizza-parlor \
  node:latest \
  sh -c "yarn install && yarn run dev"
