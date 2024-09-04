import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addErrorMessage' : ActorMethod<[string], undefined>,
  'clearErrorMessages' : ActorMethod<[], undefined>,
  'getErrorCount' : ActorMethod<[], bigint>,
  'getErrorMessages' : ActorMethod<[], Array<string>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
