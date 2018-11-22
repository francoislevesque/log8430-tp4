:load /home/forge/log8430-tp4.witify.io/Main.scala

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --conf "spark.mongodb.input.uri=mongodb://127.0.0.1:27017/log8430-tp4.invoices?readPreference=primaryPreferred" --conf "spark.mongodb.output.uri=mongodb://127.0.0.1:27017/log8430-tp4.frequent_products" --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

### Steps

cd spark-docker
docker-compose build
docker-compose up -d & docker-compose scale slave=2

### Run a Spark Shell on the master
docker run -it --net sparkcluster_default anchormen/spark /opt/spark/bin/spark-shell --master spark://master:7077

### Submit a task to the master
cd ../spark-driver-docker
docker build -t anchormen/spark-driver .
docker run --net sparkcluster_default -e "SPARK_CLASS=nl.anchormen.WordCount" anchormen/spark-driver