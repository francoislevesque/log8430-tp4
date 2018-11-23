from pyspark import SparkContext, SparkConf

conf = SparkConf().setAppName("frequent-products")
sc = SparkContext(conf=conf)

print("--------------------Hit!----------------------")
