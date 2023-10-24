"use client";

import { scrapeAndStoreproduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidProductLink = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check hostname contain amazon.com or amazon.
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log("Invalid url", error);
  }
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidProductLink(searchPrompt);

    if (!isValidLink) {
      return alert("Please provide a valid Amazon link");
    }

    try {
      setIsLoading(true);

      // Scrape the product
      const product = await scrapeAndStoreproduct(searchPrompt);
      
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Product Link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching...." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
