import Error "mo:base/Error";
import Func "mo:base/Func";
import Nat "mo:base/Nat";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  // Stable variable to store error messages
  stable var errorMessages : [Text] = [];

  // Function to add an error message
  public func addErrorMessage(message : Text) : async () {
    errorMessages := Array.append(errorMessages, [message]);
    Debug.print("New error message added: " # message);
  };

  // Function to get all error messages
  public query func getErrorMessages() : async [Text] {
    errorMessages
  };

  // Function to clear all error messages
  public func clearErrorMessages() : async () {
    errorMessages := [];
    Debug.print("All error messages cleared");
  };

  // Function to get the count of error messages
  public query func getErrorCount() : async Nat {
    errorMessages.size()
  };
}