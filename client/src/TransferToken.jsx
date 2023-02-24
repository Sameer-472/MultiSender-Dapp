import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

const TransferToken = () => {
  const { GetBalance, TransferToken } = useContext(Context);
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [amount, setAmount] = useState(null);

  const gettingBalance = async (address) => {
    const result = await GetBalance(address);
      console.log(result)
      setBalance(result);
      return result;
  };

  const transferToken = async (to, amount) => {
    console.log("data", receiver, amount);
    console.log("data", to, amount);

    try {
      const result = await TransferToken(to, amount);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h3>Get balance</h3>
        <input
          type="text"
          name="address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={() => gettingBalance(address)}>Get Balance</button>
        <p>{balance}</p>
      </div>

      <div>
        <h3>Transfer Token</h3>
        <input
          type="text"
          name="receiver"
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="number"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => transferToken(receiver, amount)}>
          Transfer Token
        </button>
      </div>
    </div>
  );
};

export default TransferToken;
