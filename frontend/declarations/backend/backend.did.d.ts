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
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : PoolData } |
  { 'err' : string };
export type Result_2 = { 'ok' : number } |
  { 'err' : string };
export interface _SERVICE {
  'getCurrentPrice' : ActorMethod<[], Result_2>,
  'getPoolData' : ActorMethod<[], Result_1>,
  'updatePoolData' : ActorMethod<[PoolData], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
