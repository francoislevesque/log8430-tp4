from pyspark.sql import SparkSession
from pyspark.sql.functions import explode
from operator import add

sparkSession = SparkSession \
    .builder \
    .appName("frequent-products") \
    .config("spark.mongodb.input.uri", "mongodb://admin:secret@db:27017/log8430-tp4.invoices") \
    .getOrCreate()

df = sparkSession.read.format("com.mongodb.spark.sql.DefaultSource").load()
frequentProducts = df.rdd.flatMap(lambda r: r.products).foldByKey(0, add).sortBy(lambda r: r[1], 0).collect()

print('-------Frequent products-------')

print(frequentProducts)

print("--------------END--------------")