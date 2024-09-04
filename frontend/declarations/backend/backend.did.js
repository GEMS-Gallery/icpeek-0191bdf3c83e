export const idlFactory = ({ IDL }) => {
  const PoolData = IDL.Record({
    'reserve0' : IDL.Float64,
    'reserve1' : IDL.Float64,
    'totalSupply' : IDL.Float64,
    'tokenA' : IDL.Text,
    'tokenB' : IDL.Text,
    'kLast' : IDL.Float64,
  });
  return IDL.Service({
    'getCurrentPrice' : IDL.Func([], [IDL.Float64], ['query']),
    'getPoolData' : IDL.Func([], [PoolData], ['query']),
    'updatePoolData' : IDL.Func([PoolData], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
