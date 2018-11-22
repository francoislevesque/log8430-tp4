import com.mongodb._
import com.mongodb.spark._
import com.mongodb.spark.sql._
import org.bson.Document
import com.mongodb.spark.config._
import org.apache.spark.rdd.RDD
import org.apache.spark.mllib.fpm.FPGrowth

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
      .config("spark.mongodb.input.uri", "mongodb://127.0.0.1:27017/log8430-tp4.invoices?readPreference=primaryPreferred")
      .config("spark.mongodb.output.uri", "mongodb://127.0.0.1:27017/log8430-tp4.frequent_products")
      .getOrCreate()

    // Load products table into data frame.
    val df = MongoSpark.load(spark)

    // Select only raw information on number of products per invoice.
    val dfInvoices = df.select("products")

    // Convert data frame to resilient distributed dataset (RDD)
    val invoices: org.apache.spark.rdd.RDD[org.apache.spark.sql.Row] = dfInvoices.rdd
    invoices.collect().foreach(println)

    // FPG
/*
    val fpg = new FPGrowth()
        .setMinSupport(0.2)
        .setNumPartitions(10)
    val model = fpg.run(invoices)

    model.freqItemsets.collect().foreach { itemset =>
        println(s"${itemset.items.mkString("[", ",", "]")},${itemset.freq}")
    }
*/
    
  }
}

GettingStarted.main(null)
