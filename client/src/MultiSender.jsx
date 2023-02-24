import { utils } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "./Context";
import "./MultiSender.css";
import { ethers } from "ethers";
import ERC20 from "./contract/ERC20.json";

const MultiSender = () => {
  const { MultiBNBSender, walletAddress, MultiTokenSender } =
    useContext(Context);
  const [inputText, setInputText] = useState("");
  const [selectState, setSelectState] = useState("bnbSender");
  const [recipients, setRecipients] = useState([]);
  const [amount, setAmount] = useState([]);
  const [totalAmount, settotalAmount] = useState([]);
  const [sumOfTotalAmount, setSumOfTotalAmount] = useState(null);
  const [tokenAddress, settokenAddress] = useState("");
  const [symbol, setSymbol] = useState(null);
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [decimals, setDecimals] = useState(null);
  const [validToken, setValidToken] = useState(true);
  const [approve, setApprove] = useState(false);
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  const ApproveSpender = (value) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        ERC20.abi,
        signer
      );
      console.log(sumOfTotalAmount);
      const _sumOfTotalAmount = totalAmount.reduce((a, b) => a + b, 0);
      console.log(_sumOfTotalAmount);
      const parseTotal = utils.parseUnits(
        _sumOfTotalAmount.toString(),
        "ether"
      );
      console.log(parseTotal);
      ERC20Contract.approve(
        "0x65D1Bb11e19e8e6eE0710562FD4Ed549cF748914",
        parseTotal.toString()
      );
      setApprove(true);
    } catch (error) {
      console.log(error);
      setApprove(false);
    }
  };

  const _MultiSenderToken = async (_recipients, _amount) => {
    // console.log(_recipients);
    // console.log(_amount);
    ApproveSpender();
    await MultiTokenSender(tokenAddress, _recipients, _amount);
  };

  const submit = (e) => {
    e.preventDefault();
    const entries = inputText.split("\n");
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      const entryArr = entry.split(",");
      console.log(entryArr);
      const recipientsArr = entryArr[0];
      const amountArr = entryArr[1];
      totalAmount.push(parseFloat(amountArr));
      recipients.push(recipientsArr);
      amount.push(utils.parseUnits(amountArr, "ether")._hex);
    }
    console.log(amount);
    const _sumOfTotalAmount = totalAmount.reduce((a, b) => a + b, 0);
    console.log(_sumOfTotalAmount);
    const parseTotal = utils.parseUnits(_sumOfTotalAmount.toString(), "ether");
    console.log(parseTotal);
    setSumOfTotalAmount(parseTotal);
    console.log(parseTotal.toString());
    try {
      console.log(selectState);
      selectState === "bnbSender"
        ? MultiBNBSender(recipients, amount, {
            value: parseTotal.toString(),
            gasLimit: 3000000,
          })
        : _MultiSenderToken(recipients, amount);
      handleTokenAddressChange(tokenAddress);
      setRecipients([]);
      setAmount([]);
    } catch (error) {
      console.log(error);
    }

    setInputText("");
  };

  const handleTokenAddressChange = async (_tokenAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(_tokenAddress, ERC20.abi, provider);
      console.log(validToken);
      console.log(contract);
      // getting symbol
      const _symbol = await contract.symbol();
      setSymbol(_symbol);
      console.log(_symbol);
      // getting balance
      const _balance = await contract.balanceOf(walletAddress);
      let numStr = _balance.toString();
      let formattedNumStr = numStr.slice(0, 2) + "." + numStr.slice(2);
      let formattedNum = parseFloat(formattedNumStr);
      setBalance(formattedNum);
      //getting name;
      const _name = await contract.name();
      setName(_name);
      console.log(_name);
      //getting total supply
      const _supply = await contract.totalSupply();
      setTotalSupply(_supply.toString());
      console.log(_supply);
      // getting decimals of the token
      const _decimals = await contract.decimals();
      setDecimals(_decimals);
      console.log(decimals);
      setValidToken(true);
    } catch (error) {
      setValidToken(false);
      console.log(validToken);
      console.log(error);
    }
  };

  const handleTokenChange = (e) => {
    settokenAddress(e.target.value);
  };

  useEffect(() => {
    try {
      console.log("hello useEffect");
      handleTokenAddressChange(tokenAddress);
    } catch (error) {
      console.log(error);
    }
  }, [tokenAddress]);

  const renderButton = () => {
    if (selectState === "bnbSender") {
      return (
        <button type="submit" className="transfer">
          Transfer BNB
        </button>
      );
    } else {
      return (
        <button type="submit" className="transfer">
          Approve & Transfer
        </button>
      );
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        Bulk Sender:
        <select
          name="select"
          id=""
          onClick={(e) =>
            e.target.value === "tokenSender"
              ? setSelectState("tokenSender")
              : setSelectState("bnbSender")
          }
          className="select"
        >
          <option value="bnbSender" className="option">
            BNB Sender
          </option>
          <option value="tokenSender" className="option">
            TokenSender
          </option>
        </select>
        {selectState === "tokenSender" ? (
          <>
            <p>Token Address:</p>
            <input
              type="text"
              name="tokenAddress"
              className="tokenAddressField"
              placeholder="0x00000000000000000000000000000"
              id=""
              value={tokenAddress}
              onChange={handleTokenChange}
              required
            />
            {validToken ? (
              <>
                <div className="tokenDetails">
                  <p>
                    <b>Name:</b>
                  </p>
                  <p>{name}</p>
                  <p>
                    <b>Symbol:</b>
                  </p>
                  <p>{symbol}</p>
                  <p>
                    <b>Decimal:</b>
                  </p>
                  <p>{decimals}</p>
                  <p>
                    <b>Balance:</b>
                  </p>
                  <p>{balance}</p>
                </div>
              </>
            ) : null}
          </>
        ) : null}
        <br />
        <p>Allocations</p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="allocationsField"
          placeholder="Insert allocation separate with breaks link. By format: address,amount Ex:  0x000000000000000000000000000000000000000,13.45 0x000000000000000000000000000000000000000,1.049 0x000000000000000000000000000000000000000,1"
          value={inputText}
          onChange={handleInputChange}
          type="any"
          required
        />
        <br />
        {/* {selectState === "bnbSender" ? (
          <button type="submit" className="transfer">
            Transfer
          </button>
        ) : (
          <button onClick={ApproveSpender} className="transfer">
            Approve
          </button>
        )} */}
        {renderButton()}
      </form>
    </>
  );
};

export default MultiSender;

// const parsePrice = utils.parseUnits("20" , "ether");
// console.log([parsePrice])

// console.log(typeof(arrayInput[i]));

// const parseValue = utils.parseUnits(arrayInput[i].toString(), "ether");
// amount.push(parseAmount);

// MultiTokenSender(tokenAddress, recipients);
