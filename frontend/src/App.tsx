import React, { useState, useEffect, useCallback } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/backend/index';
import { _SERVICE } from '../declarations/backend/backend.did';

const IC_HOST = 'https://ic0.app';
const CANISTER_ID = '5sfsu-ciaaa-aaaad-qamka-cai';

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

  const createActor = useCallback(async () => {
    try {
      const agent = new HttpAgent({ host: IC_HOST });
      await agent.fetchRootKey();
      return Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: CANISTER_ID,
      });
    } catch (error) {
      console.error('Error creating actor:', error);
      throw new Error('Failed to initialize connection to the Internet Computer');
    }
  }, []);

  const fetchPoolData = useCallback(async () => {
    try {
      const actor = await createActor();
      const result = await actor.getPoolData();
      if ('ok' in result) {
        return result.ok;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error fetching pool data:', error);
      throw error;
    }
  }, [createActor]);

  const updatePoolData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPoolData = await fetchPoolData();
      setPoolData(fetchedPoolData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchPoolData]);

  useEffect(() => {
    updatePoolData();
    const interval = setInterval(updatePoolData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [updatePoolData]);

  const calculatePrice = useCallback(() => {
    if (poolData && poolData.reserve0 > 0) {
      return poolData.reserve1 / poolData.reserve0;
    }
    return 0;
  }, [poolData]);

  const handleRetry = () => {
    updatePoolData();
  };

  if (error) {
    return (
      <div className="container">
        <h1 className="header">ICP/USDC Liquidity Pool</h1>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={handleRetry} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  if (loading && !poolData) {
    return (
      <div className="container">
        <h1 className="header">ICP/USDC Liquidity Pool</h1>
        <p className="text-center">Loading pool data...</p>
      </div>
    );
  }

  if (!poolData) {
    return (
      <div className="container">
        <h1 className="header">ICP/USDC Liquidity Pool</h1>
        <p className="fallback-message">No pool data available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="header">ICP/USDC Liquidity Pool</h1>
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
    </div>
  );
};

export default App;