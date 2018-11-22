import com.mongodb._
import com.mongodb.spark._
import org.bson.Document

object GettingStarted {

  def main(args: Array[String]): Unit = {

    /* Create the SparkSession.
     * If config arguments are passed from the command line using --conf,
     * parse args for the values to set.
     */
    import org.apache.spark.sql.SparkSession

    val spark = SparkSession.builder()
      .master("local")
      .appName("MongoSparkConnector")
      .config("spark.mongodb.input.uri", "mongodb://admin:secret@0.0.0.0:27017/log8430-tp4.products")
      .config("spark.mongodb.output.uri", "mongodb://admin:secret@0.0.0.0:27017/log8430-tp4.frequent_products")
      .getOrCreate()

    val readConfig = ReadConfig(Map("uri" -> "mongodb://admin:secret@0.0.0.0:27017/log8430-tp4.products", "readPreference.name" -> "secondaryPreferred"))
    val df = MongoSpark.load(spark)

    println(df.count)
    //println(rdd.first.toJson)
  }
}

GettingStarted.main(null)
