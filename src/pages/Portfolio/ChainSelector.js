import React from 'react';

const blockchainOptions = [
  { id: 'eth', name: 'Ethereum', logo: './chainLogos/ethereum-eth-logo.svg' },
  { id: 'polygon', name: 'Polygon', logo: './chainLogos/polygon-matic-logo.svg' },
  { id: 'bsc', name: 'BNB Chain', logo: './chainLogos/bnb-bnb-logo.svg' },
  { id: 'optimism', name: 'Optimism', logo: './chainLogos/optimism-op-logo.svg' },
  { id: 'base', name: 'Base', logo: './chainLogos/base-logo.svg' }
];

const ChainSelector = ({selectedChains, onSelectionChange, netWorth}) => {

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const toggleChain = (chainId) => {
    onSelectionChange(prevSelected => {
      const isCurrentlySelected = prevSelected.includes(chainId);
      if (isCurrentlySelected) {
        // Remove chainId from the array if it's currently selected
        return prevSelected.filter(id => id !== chainId);
      } else {
        // Add chainId to the array if it's not currently selected
        return [...prevSelected, chainId];
      }
    });
  };

  return (
    <div className="chain-selector">
      {blockchainOptions.map(chain => (
        <button key={chain.id} className={`chain-button ${selectedChains.includes(chain.id) ? 'selected' : ''}`} onClick={() => toggleChain(chain.id)}>
          <img src={chain.logo} alt={chain.name} className="chain-logo" />
          <div className='chain-details'>
            <div className='chain-name'>
                {chain.name}
            </div>
            <div className='chain-value'>
                { USDollar.format(netWorth.chains?.find( c => c.chain === chain.id).networth_usd) }
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChainSelector;