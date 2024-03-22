import React, { useState } from 'react';


// Tab component for individual tabs
const Tab = ({isActive, onClick, children}) => (
  <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
);

// Tabs container component
const DiscoveryTabs = ({children}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="tabs">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab key={label} isActive={label === activeTab} onClick={() => handleClick(label)}>
              {label}
            </Tab>
          );
        })}
      </div>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default DiscoveryTabs;