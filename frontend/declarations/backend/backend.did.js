export const idlFactory = ({ IDL }) => {
  const Result_2 = IDL.Variant({ 'ok' : IDL.Float64, 'err' : IDL.Text });
  const PoolData = IDL.Record({
    'reserve0' : IDL.Float64,
    'reserve1' : IDL.Float64,
    'totalSupply' : IDL.Float64,
    'tokenA' : IDL.Text,
    'tokenB' : IDL.Text,
    'kLast' : IDL.Float64,
  });
  const Result_1 = IDL.Variant({ 'ok' : PoolData, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getCurrentPrice' : IDL.Func([], [Result_2], ['query']),
    'getPoolData' : IDL.Func([], [Result_1], ['query']),
    'updatePoolData' : IDL.Func([PoolData], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
