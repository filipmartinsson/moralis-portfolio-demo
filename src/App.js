import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState('0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543'); // State to store the input address

  const fetchAssets = async (address) => {
    if(process.env.REACT_APP_MORALIS_API_KEY){
      try {
        // Replace this URL with the actual API endpoint
        const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true`, 
          {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY
            },
          });
        const data = await response.json();
        console.log(data.result)
        setAssets(data.result);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    }
    else{
      console.error("No Moralis API key in .env")
    }
  };

  // Function to handle the input change
  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    fetchAssets(address);
  };

  useEffect(() => {
    fetchAssets(address);
  }, [address]); 

  return (
    <div className="app">
      <h1>My Crypto Portfolio</h1>
      <div>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
        />
        <button onClick={handleButtonClick}>Fetch Assets</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Value</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.token_address}>
              <td><img src={asset.thumbnail} alt={asset.name} className="asset-logo" /></td>
              <td>{asset.name}</td>
              <td>${parseFloat(asset.usd_price?.toFixed(2))}</td>
              <td>${parseFloat(asset.usd_value?.toFixed(2))}</td>
              <td className={asset.usd_price_24hr_percent_change < 0 ? 'negative' : 'positive'}>
                {parseFloat(asset.usd_price_24hr_percent_change?.toFixed(2))}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;