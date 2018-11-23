:load /home/forge/log8430-tp4.witify.io/Main.scala

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --conf "spark.mongodb.input.uri=mongodb://127.0.0.1:27017/log8430-tp4.invoices?readPreference=primaryPreferred" --conf "spark.mongodb.output.uri=mongodb://127.0.0.1:27017/log8430-tp4.frequent_products" --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

### Construire les containers Docker
`cd cluster`
`docker-compose build`

### Démarrer les containers Docker en choisissant le nombre de slaves
`docker-compose up -d && docker-compose scale slave=2`

### Interfaces
Il est maintenant possible de consulter le client, le Spark UI et le service REST sur localhost.

| URL               | Site web      | 
| ----------------- | ------------- | 
| localhost:80      | client        | 
| localhost:3000    | Service REST  |
| localhost:8080    | Spark UI      |

### Créer la database
Si c'est la première fois que ce docker-compose est exécuter, il faut créer une base de donnée. Il faut d'abord accéder en ssh à la base de donnée:
`docker-compose exec db bash`
`mongo`
Ensuite créer une base de données nommée log8430-tp4:
`use log8430-tp4`
Créer un utilisateur associé (admin:secret)
```js
db.createUser({
    user: 'admin',
    pwd: 'secret',
    roles: [ "dbOwner" ]
})
```
Créer les collections
```
db.createCollection('products')
db.createCollection('invoices')
```

## Redémarrer docker-compose
`docker-compose build`
`docker-compose up -d && docker-compose scale slave=2`

### Envoyer une tâche au master via spark-submit

Se connecter en ssh au container spark-driver
`docker-compose exec driver bash`
Envoyer un script python au serveur master
```
opt/spark/bin/spark-submit \
  --master spark://master:7077 \
  opt/spark/tasks/FrequentProducts.py
```