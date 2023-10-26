"use server";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapedAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

// Scrape and store product to the Database
export async function scrapeAndStoreproduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct: any = await scrapedAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        {
          price: scrapedProduct.currentPrice,
        },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.url,
      },
      product,
      {
        upsert: true,
        new: true,
      }
    );

    revalidatePath(`/products/${newProduct._id}`)
  } catch (error: any) {
    throw new Error("Failed to create/update product: ", error.message);
  }
}


// get prouduct by id
export async function getProductById(productId: string){
try {
  connectToDB();
  const product = await Product.findOne({_id: productId});
  if(!product) return;

  return product;
} catch (error:any) {
  throw new Error("failed to get product by Id: ", error.message)
}
}

// Get all products
export async function getAllProducts(){
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error:any) {
    throw new Error("Error while fetching all the products ", error.message);
  }
}

// Show similar product
export async function getSimilarProduct(productId: string){
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if(!currentProduct) return null;

    const similarProduct = await Product.find({
      _id: {$ne: productId}
    }).limit(3);

    return similarProduct;
  } catch (error:any) {
    throw new Error("Error while fetching all the products ", error.message);
  }
}