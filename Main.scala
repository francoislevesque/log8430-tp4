import com.mongodb._
import com.mongodb.spark._
import com.mongodb.spark.sql._
import org.bson.Document
import com.mongodb.spark.config._

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
      .config("spark.mongodb.input.uri", "mongodb://127.0.0.1:27017/log8430-tp4.products?readPreference=primaryPreferred")
      .config("spark.mongodb.output.uri", "mongodb://127.0.0.1:27017/log8430-tp4.frequent_products")
      .getOrCreate()

    val df = MongoSpark.load(spark)

    println(df.show())
    //println(rdd.first.toJson)
  }
}

GettingStarted.main(null)
