import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const IC_DEX_URL = 'https://5sfsu-ciaaa-aaaad-qamka-cai.raw.ic0.app';

type PoolData = {
  tokenA: string;
  tokenB: string;
  reserve0: number;
  reserve1: number;
  totalSupply: number;
  kLast: number;
};

const App: React.FC = () => {
  const [poolData, setPoolData] = useState<PoolData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchICPUSDCPool = async () => {
    const query = `
    query {
      getPool(tokenA: "ryjl3-tyaaa-aaaaa-aaaba-cai", tokenB: "mxzaz-hqaaa-aaaar-qaada-cai") {
        tokenA
        tokenB
        reserve0
        reserve1
        totalSupply
        kLast
      }
    }`;

    try {
      const response = await fetch(`${IC_DEX_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      return data.data.getPool;
    } catch (error) {
      console.error('Error fetching ICP/USDC pool data:', error);
      throw error;
    }
  };

  const updatePoolData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPoolData = await fetchICPUSDCPool();
      if (fetchedPoolData) {
        setPoolData(fetchedPoolData);
        await backend.updatePoolData(fetchedPoolData);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePoolData();
    const interval = setInterval(updatePoolData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const calculatePrice = () => {
    if (poolData && poolData.reserve0 > 0) {
      return poolData.reserve1 / poolData.reserve0;
    }
    return 0;
  };

  return (
    <div className="container">
      <h1 className="header">ICP/USDC Liquidity Pool</h1>
      {loading && <p className="text-center">Loading pool data...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {poolData && (
        <div className="pool-data">
          <div className="pool-item">
            <span className="pool-label">ICP Reserve:</span>
            <span className="pool-value">{poolData.reserve0.toFixed(4)}</span>
          </div>
          <div className="pool-item">
            <span className="pool-label">USDC Reserve:</span>
            <span className="pool-value">{poolData.reserve1.toFixed(4)}</span>
          </div>
          <div className="pool-item">
            <span className="pool-label">Total Supply:</span>
            <span className="pool-value">{poolData.totalSupply.toFixed(4)}</span>
          </div>
          <div className="pool-item">
            <span className="pool-label">K Last:</span>
            <span className="pool-value">{poolData.kLast.toFixed(4)}</span>
          </div>
          <div className="price">
            Current ICP price in USDC: ${calculatePrice().toFixed(4)}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;