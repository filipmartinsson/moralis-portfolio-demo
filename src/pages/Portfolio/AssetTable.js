import React, {useState, useEffect } from "react";

const AssetTable = ({selectedChains, address}) => {
  
  const [assets, setAssets] = useState([]);


  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const fetchAssets = async (address, selectedChains) => {
    const baseUrl = "https://deep-index.moralis.io/api/v2.2/wallets";
    const queryParams = "exclude_spam=true&exclude_unverified_contracts=true";
    const headers = {
      "Content-Type": "application/json",
      "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
    };
  
    try {
      // Map each chain in selectedChains to a fetch call
      const fetchPromises = selectedChains.map(chain =>
        fetch(`${baseUrl}/${address}/tokens?chain=${chain}&${queryParams}`, { headers })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch for chain: ${chain}`);
            }
            return response.json()
          })
          .then( data => {
            return data.result.map( token => {return {...token, chain: chain} });
          })
          .catch(error => console.error(`Fetch error for chain ${chain}:`, error))
      );
  
      // Wait for all fetch calls to complete
      const results = await Promise.all(fetchPromises);
  
      // Combine results from all chains (assuming the results are arrays of tokens)
      const combinedResults = results.flat()
        .filter( (token) => token.usd_value > 0.1 )
        .sort( (a, b) => b.usd_value - a.usd_value ); 
      console.log(combinedResults)
      return setAssets(combinedResults);
    } catch (error) {
      console.error("Error fetching assets by chain:", error);
      return []; // Return an empty array or handle the error as appropriate
    }
  }

  useEffect( () => {
    fetchAssets(address, selectedChains);
  }, [address, selectedChains])

  return (
    <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Value</th>
            <th>24h change</th>
          </tr>
        </thead>
        <tbody>
          {assets?.map( (asset) => (
            <tr key={asset.chain + "-" + asset.token_address}>
              <td>
                { asset.thumbnail ? 
                    (<img src={asset.thumbnail} alt={asset.name} className='asset-logo' />) 
                    : 
                    (<div className="logo-fallback">{asset.symbol} </div>) 
                }
              </td>
              <td>{asset.name}</td>
              <td>{USDollar.format(asset.usd_price)}</td>
              <td>{USDollar.format(asset.usd_value)}</td>
              <td className={asset.usd_price_24hr_percent_change < 0 ? "negative" : "positive"}>
                {asset.usd_price_24hr_percent_change?.toFixed(2)}%
                </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default AssetTable;