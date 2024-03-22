import React, {useEffect, useState } from "react";
import DiscoveryTabs from "./DiscoveryTabs";
import CryptoTable from "./CryptoTable";

import './Discovery.css';

function Discovery() {

  const [discoveryTokens, setdiscoveryTokens] = useState({})


  const fetchDiscovery = async () => {
    let endpoints = [
      { id: "market-cap", url: "https://deep-index.moralis.io/api/v2.2/market-data/global/market-cap"},
      { id: "volume",  url: "https://deep-index.moralis.io/api/v2.2/market-data/global/volume"},
      { id: "hottest-collections",  url: "https://deep-index.moralis.io/api/v2.2/market-data/nfts/hottest-collections"},
      { id: "top-collections",  url: "https://deep-index.moralis.io/api/v2.2/market-data/nfts/top-collections"},
      { id: "top-movers",  url: "https://deep-index.moralis.io/api/v2.2/market-data/erc20s/top-movers"}
    ]
    try {

      endpoints.map(endpoint => {
        return {
          ...endpoint, 
          
        }endpoint.response = fetch(endpoint.url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY
          }
        })
      })

      setNetWorth(data);
      
    } catch (error) {
      
    }
  }

  useEffect( () => {
    fetchDiscovery()
  }, [])

  return (
    <div>
      <h1>Discovery</h1>
      <DiscoveryTabs>
        <div label="Top Cryptocurrencies by Market Cap">
          <CryptoTable/>
        </div>
        <div label="Top Cryptocurrencies by Trading Volume">
          Content of Tab 2
        </div>
        <div label="Hottest NFT Collections">
          Content of Tab 3
        </div>
        <div label="Top NFT Collections by Trading Volume">
          Content of Tab 4
        </div>
        <div label="Top Movers (ERC20)">
          Content of Tab 5
        </div>
      </DiscoveryTabs>
    </div>
  );
}

export default Discovery;
