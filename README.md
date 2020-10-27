# CMPSC487W-Group2Project

This is a sample README markdown file for our group git repository.

To setup with Docker:
1. Install Docker Desktop
2. Launch docker desktop
3. Download github files from main branch and save where you want the code to be
5. In your terminal/power shell, navigate into the folder from github
6. Run this command: docker-compose up -d
7. Make sure you have MySQL installed.
8. Run this command: docker ps
9. Note the CONTAINER ID for the mysql container
10. Run this command with the ID: docker exec -it CONTAINERID mysql -p
11. Enter password: group24ever
12. Run the MySQL code in the database_structure.sql file

This should start a stack of containers in Docker Desktop. You can stop and start this whenever you want to work on it by clicking the buttons. The database will relaunch with the previously stored items every time start it in Docker Desktop.


## Main Components

1. Docker containers for Node.js server and MySQL DB
2. Javascript based app
3. HTML/CSS with Bootstrap
4. GitHub repository

## Table Structure
Docker does not copy the contents of a MySQL database between users. You will need to keep your own DB running on your machine and create tables/data within it to match the decided on structure.

Goal: To have a "starter" sql file that can be run to populate our databases with the right stuff


## Documentation That Was Helpful
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
