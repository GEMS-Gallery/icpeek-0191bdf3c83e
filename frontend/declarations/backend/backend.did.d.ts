import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface PoolData {
  'reserve0' : number,
  'reserve1' : number,
  'totalSupply' : number,
  'tokenA' : string,
  'tokenB' : string,
  'kLast' : number,
}
export interface _SERVICE {
  'getCurrentPrice' : ActorMethod<[], number>,
  'getPoolData' : ActorMethod<[], PoolData>,
  'updatePoolData' : ActorMethod<[PoolData], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
