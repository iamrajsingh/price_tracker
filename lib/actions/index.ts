"use server";
import { scrapedAmazonProduct } from "../scraper";

export async function scrapeAndStoreproduct(productUrl: string) {
  if (!productUrl) return;
    const scrapedProduct = await scrapedAmazonProduct(productUrl)
  try {
  } catch (error: any) {
    throw new Error("Failed to create/update product: ", error.message);
  }
}
