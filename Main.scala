import com.mongodb.spark._
import com.mongodb.spark.config.ReadConfig
import com.mongodb.spark.sql._
import com.typesafe.scalalogging.slf4j.LazyLogging
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.{max, min}
import org.bson.Document

object Main extends App with LazyLogging {
    val spark = SparkSession.builder()
    .appName("log8430-tp4")
    .master("local[*]")
    .getOrCreate()

  // Read the data from MongoDB to a DataFrame
  val readConfig = ReadConfig(Map("uri" -> "mongodb://127.0.0.1/", "database" -> "log8430-tp4", "collection" -> "invoices")) // 1)
  val zipDf = spark.read.mongo(readConfig) // 2)
  zipDf.printSchema() // 3)
  zipDf.show()
}
