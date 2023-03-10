import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import {
  useActiveListings,
  useContract,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home: NextPage = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(contract);

  return (
    <div className="">
      <Head>
        <title>Ebay NFT Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto p-2">
        {loadingListings ? (
          <p className="text-center animate-pulse text-blue-500">
            Loading listenings
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
            {listings?.map((listing) => (
              <Link href={`/listing/${listing.id}`} key={listing.id}>
                <div
                  key={listing.id}
                  className="flex flex-col card hover:scale-105 translate-all duration-150 ease-out"
                >
                  <div className="flex-1 flex flex-col pb-2 items-center">
                    <MediaRenderer src={listing.asset.image} className="w-44" />
                  </div>

                  <div className="pt-2 space-y-4">
                    <div>
                      <h2 className="truncate text-lg">{listing.asset.name}</h2>
                      <hr />
                      <p className="truncate text-sm text-gray-600 mt-2">
                        {listing.asset.description}
                      </p>
                    </div>

                    <p className="">
                      <span className="font-bold mr-1">
                        {listing.buyoutCurrencyValuePerToken.displayValue}
                      </span>
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>

                    <div
                      className={`flex items-center space-x-1 justify-end text-xs 
                  border w-fit ml-auto p-2 rounded-lg text-white
                   ${
                     listing.type === ListingType.Direct
                       ? "bg-blue-500"
                       : "bg-red-500"
                   }`}
                    >
                      <p>
                        {listing.type === ListingType.Direct
                          ? "Buy Now"
                          : "Auction"}
                      </p>
                      {listing.type === ListingType.Direct ? (
                        <BanknotesIcon className="h-4" />
                      ) : (
                        <ClockIcon className="h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
