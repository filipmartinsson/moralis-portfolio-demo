import React, {useEffect, useState } from "react";

function CryptoTable( {assets} ) {

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
<table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Volume</th>
            <th>Price</th>
            <th>24h change</th>
          </tr>
        </thead>
        <tbody>
          {assets?.map( (asset) => (
            <tr key={asset.symbol}>
              <td>{asset.market_cap_rank}</td>
              <td>
                    <img src={asset.logo} alt={asset.name} className='asset-logo' />
              </td>
              <td>{asset.name}</td>
              <td>{USDollar.format(asset.total_volume)}</td>
              <td>{USDollar.format(asset.price_usd)}</td>
              <td className={asset.usd_price_24h_percent_change < 0 ? "negative" : "positive"}>
                {asset.usd_price_24h_percent_change?.toFixed(2)}%
                </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default CryptoTable;
