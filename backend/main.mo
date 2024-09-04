import Text "mo:base/Text";

import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

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

  public func updatePoolData(poolData: PoolData) : async () {
    currentPoolData := poolData;
    Debug.print("Pool data updated");
  };

  public query func getPoolData() : async PoolData {
    currentPoolData
  };

  public query func getCurrentPrice() : async Float {
    if (currentPoolData.reserve0 == 0) {
      return 0;
    };
    currentPoolData.reserve1 / currentPoolData.reserve0
  };
}