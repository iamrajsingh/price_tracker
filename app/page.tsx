import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import React from "react";

const home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:{" "}
              <Image src="/assets/icons/arrow-right.svg" alt="Right" width={16} height={16}/>
            </p>
            <h1 className="head-text">
              Discover the Best Products for You! <br />
              <span className="text-primary"> At best price
              </span>
            </h1>
            <p className="mt-6">
              We are a team of experts who have spent years in researching and developing products that make your life easier, saving you time and money.
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Apple Iphone 15', 'book', 'Sneakers'].map((product)=> (
              <div>
                {product}
              </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default home;
