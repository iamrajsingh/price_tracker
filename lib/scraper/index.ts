import axios from "axios";
import * as cheerio from 'cheerio' 

export async function scrapedAmazonProduct(url: string) {
  if (!url) return;


  //BrigthData proxy config
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    console.log(response.data)
  } catch (error:any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}