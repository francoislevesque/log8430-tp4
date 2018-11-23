:load /home/forge/log8430-tp4.witify.io/Main.scala

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

~/spark-2.4.0-bin-hadoop2.7/bin/spark-shell -i ./Main.scala --conf "spark.mongodb.input.uri=mongodb://127.0.0.1:27017/log8430-tp4.invoices?readPreference=primaryPreferred" --conf "spark.mongodb.output.uri=mongodb://127.0.0.1:27017/log8430-tp4.frequent_products" --packages org.mongodb.spark:mongo-spark-connector_2.11:2.3.1

### Steps

cd cluster
docker-compose build
docker-compose up -d && docker-compose scale slave=2

### Run a Spark Shell on the master
docker run -it --net cluster_default log8430/spark /opt/spark/bin/spark-shell --master spark://master:7077

### Submit a task to the master
cd ../spark-driver
docker build -t log8430/spark-driver .
docker run --net cluster_default -e "SPARK_CLASS=nl.anchormen.WordCount" log8430/spark-driver