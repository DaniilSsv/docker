[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GyBlhhFf)
Dit is een starter voor jullie assignment

# backend

```bash
npm i
node app.js
```

Lokaal<br/>
![alt text](image.png)

# frontend

```bash
npm i
npm start
```

Lokaal<br/>
![alt text](image-1.png)

# Dockerizing

## Backend

Aanmaken van de DockerFile<br/>
een dockerIgnore voor node modules en log

cors moet correct ingesteld worden zodat de frontend die kan bereiken

## Frontend

Zelfde stap als backend

Juiste url instellen voor de fetch in dit geval, localhost:3000

# yaml file

yaml file aanmaken<br/>
backend service draait op poort 3000<br/>
maakt gebruik van mongo uri environment en zal pas starten nadat de db is gestart.

frontend service zal op poort 80 draaien<br/>
environment verwijst naar backend

Database pullt latest img van mongo<br/>
Slaat data op in ./data/db<br/>
draait op poort 27017<br/>
creeërt een netwerk zodat alle services kunnen communiceren op backend-network

docker-compose up --build<br/>
zal alles images maken, services starten en backend exposen op localhost:3000 en frontend op localhost. Het is belangrijk om te weten dat ookal is je backend bereikbaar op http://backend:3000/car-brands. Je MOET in app localhost gebruiken omdat de react niet in de container zelf runt, maar op je browser en die heeft daar geen toegang toe.

![alt text](image-2.png)

# MiniKube

voordat we beginnen met de yamls moeten we de frontend en backend images creëren en uploaden naar dockerhub

## Images

### containers runnen

Eerts de 3 containers laten runnen, kun je checken met docker ps

### docker commit

```bash
docker commit assignment-docker-and-cloud-computing-daniilssv-backend-1 kaljmarik/backend:v1
```

dit doen we dan ook voor de andere 2 containers<br/>
behalve database, deze mag gebruik maken van mongo:latest

![alt text](image-3.png)

### docker push

Nu dat alles gecommit is kunnen we de laatste versie pushen naar dockerhub

```bash
docker push your-docker-username/backend:v1
```

We doen hetzelfde met de rest

![alt text](image-4.png)

### .yamls

We maken voor alle services een yaml deployment file<br/>
We maken een ConfigMap voor front en backend, deze geven de url mee voor connectie<br/>
Er zijn geen secrets nodig en binnen de services.yaml vind je nodige instellingen voor alle 3 de services

## Minikube

starten: `minikube start` <br/>
status checken: `minikube status` <br/>

vervolgens testen of je connectie hebt met minikube

```bash
kubectl cluster-info
kubectl get nodes
```

### applying yamls naar minikube

VOLGORDE IS BELANGRIJK, anders moet je bepaalde pods restarten of wachten tot zij dat zelf doen.

Eerst voeren we de configuratie en services uit.

```bash
kubectl apply -f k8s/configMap.yaml
kubectl apply -f k8s/services.yaml
```

Vervolgens deployen we de apps

```bash
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
```

## verifiëren

In ons geval testen we indien de loadbalancer 3 pods kan maken voor de scalability en of ze werken

```bash
kubectl get pods
kubectl get services
```

![alt text](image-5.png)

Het is belangrijk dat je een tunnel opent voor minikube. Minikube support standaard geen loadbalancer services. Om onze front- en backend te bereiken moeten we een tunnel openen.

```bash
minikube tunnel
```

![alt text](image-7.png)

Zie onderstaande image dat de frontend bereikbaar staat op 3 ip's omdat we 3 replicas hebben ingesteld.
![alt text](image-13.png)

Na meerdere browsers en refreshes zien wij dat er in verschillende pods logs te zien zijn dat ze bereikt waren.

![alt text](image-14.png)

We voeren nog eens de get services uit om aan te tonen dat er maar 1 draait.

![alt text](image-15.png)

### Success

![alt text](image-9.png)

Indien nodig kun je ook de connectie testen tussen de pods door kubectl exec -it. Je voert dan een curl naar de nodige pod uit

![alt text](image-11.png)

Het is mogelijk dat de backend niet direct runt of errort, dit kan zijn omdat de db nog niet opgesteld is binnen minikube, geef het wat tijd.

# Deployment Google Cloud

## stappen

- Project aanmaken
- Kubernetes engine aanzetten
- vervolgens clusters aanmaken

We kiezen voor de meest goedkope GKE, maar wel een die genoeg is voor onze applicatie te draaien

- connecten

![alt text](image-6.png)

Het duurt even tegen dat de cluster online staat

```bash
gcloud container clusters get-credentials cluster-1 --zone europe-west1-b --project myreactapp-445621
```

- connectie testen

```bash
kubectl get nodes
```

![alt text](image-8.png)

- deployen

Eerst de configmap daarna services en dan de deployments
Nu applyen we eerst de configmap, die kun je dan testen met `kubectl get configmaps`.

Eerst deployen we MongoDB daarna backend en dan pas frontend

![alt text](image-16.png)

TESTEN

![alt text](image-19.png)
