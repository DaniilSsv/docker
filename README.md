### backend

1. npm i
2. node app.js

Lokaal
![alt text](image.png)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GyBlhhFf)
Dit is een starter voor jullie assignment

### frontend

1. npm i
2. npm start

Lokaal
![alt text](image-1.png)

### Dockerizing

## Backend

Aanmaken van de DockerFile
een dockerIgnore voor node modules en log

## Frontend

Zelfde stap als backend

## yaml file

yaml file aanmaken
backend service draait op poort 3000
maakt gebruik van mongo uri environment en zal pas starten nadat de db is gestart.

frontend service zal op poort 80 draaien
environment verwijst naar backend

Database pullt latest img van mongo
Slaat data op in ./data/db
draait op poort 27017
creeërt een netwerk zodat alle services kunnen communiceren op backend-network

docker-compose up --build
zal alles images maken, services starten en backend exposen op localhost:3000 en frontend op localhost
