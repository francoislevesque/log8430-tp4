import com.mongodb.spark._
import com.mongodb.spark.config.ReadConfig
import com.mongodb.spark.sql._
// import com.typesafe.scalalogging.slf4j.LazyLogging
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.{max, min}
import org.bson.Document

object Main extends App /* with LazyLogging */ {
    val spark = SparkSession.builder()
    .appName("log8430-tp4")
    .master("local[*]")
    .getOrCreate()

  // Read the data from MongoDB to a DataFrame
  val readConfig = ReadConfig(Map("uri" -> "mongodb://127.0.0.1:27017/", "database" -> "log8430-tp4", "collection" -> "invoices"))
  val data = spark.read.mongo(readConfig)
  
  data.printSchema()
  show(data)

  /*val transactions: RDD[Array[String]] = data.map(s => s.trim.split(' '))

  val fpg = new FPGrowth()
    .setMinSupport(0.2)
    .setNumPartitions(10)
  val model = fpg.run(transactions)

  model.freqItemsets.collect().foreach { itemset =>
    println(s"${itemset.items.mkString("[", ",", "]")},${itemset.freq}")
  }

  val minConfidence = 0.8
  model.generateAssociationRules(minConfidence).collect().foreach { rule =>
    println(s"${rule.antecedent.mkString("[", ",", "]")}=> " +
      s"${rule.consequent .mkString("[", ",", "]")},${rule.confidence}")
  }*/


}
