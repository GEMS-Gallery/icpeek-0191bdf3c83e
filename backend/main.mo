import Text "mo:base/Text";

import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";
import Error "mo:base/Error";
import Result "mo:base/Result";

actor {
  type PoolData = {
    tokenA: Text;
    tokenB: Text;
    reserve0: Float;
    reserve1: Float;
    totalSupply: Float;
    kLast: Float;
  };

  stable var currentPoolData: PoolData = {
    tokenA = "";
    tokenB = "";
    reserve0 = 0;
    reserve1 = 0;
    totalSupply = 0;
    kLast = 0;
  };

  public func updatePoolData(poolData: PoolData) : async Result.Result<(), Text> {
    try {
      currentPoolData := poolData;
      Debug.print("Pool data updated successfully");
      #ok()
    } catch (e) {
      Debug.print("Error updating pool data: " # Error.message(e));
      #err("Failed to update pool data")
    }
  };

  public query func getPoolData() : async Result.Result<PoolData, Text> {
    #ok(currentPoolData)
  };

  public query func getCurrentPrice() : async Result.Result<Float, Text> {
    if (currentPoolData.reserve0 == 0) {
      #err("Invalid reserve values")
    } else {
      #ok(currentPoolData.reserve1 / currentPoolData.reserve0)
    }
  };
}