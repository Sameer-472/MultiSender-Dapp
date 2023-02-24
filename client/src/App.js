import { Contract, ethers, providers, utils } from "ethers";
// import {ethers , providers} from "ethers"
import React, { useState, useEffect, useRef , useContext} from "react";
import Web3Modal from "web3modal";
// import "./App.css";
import "./App.css";
import { Context } from "./Context";
import MultiSender from "./MultiSender";

const App = () => {
  // console.log(styles)
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const {setwalletAddress , walletAddress} = useContext(Context);

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        providerOptions: {},
        disableInjectedProvider: false,
      });
      // connectWallet();
      // getTokenIdsMinted();
      // setInterval(async function () {
      //   await getTokenIdsMinted();
      // }, 5 * 1000);
    }
  }, [walletConnected]);

  const getProviderorSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const accounts = await provider.request({ method: "eth_accounts" });
    setwalletAddress(accounts[0]);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // const publicMint = async () => {
  //   try {
  //     const provider = new providers.Web3Provider(window.ethereum);
  //     console.log(provider);
  //     const signer = provider.getSigner();
  //     const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi.abi, signer);
  //     const tx = await nftContract.mint({
  //       value: utils.parseEther("0.01"),
  //     });
  //     setLoading(true);
  //     await tx.wait();
  //     setLoading(false);
  //     window.alert("You successfully minted a LW3Punk!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getTokenIdsMinted = async () => {
  //   try {
  //     // Get the provider from web3Modal, which in our case is MetaMask
  //     // No need for the Signer here, as we are only reading state from the blockchain
  //     // const provider = await getProviderOrSigner();
  //     const provider = new providers.Web3Provider(window.ethereum);

  //     // We connect to the Contract using a Provider, so we will only
  //     // have read-only access to the Contract
  //     const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi.abi, provider);
  //     // call the tokenIds from the contract
  //     const _tokenIds = await nftContract.tokenIds();
  //     console.log("tokenIds", _tokenIds);

  //     const tokenURI = await nftContract.tokenURI(_tokenIds);
  //     console.log(tokenURI);
  //     //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
  //     setTokenIdsMinted(_tokenIds.toString());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const connectWallet = async () => {
    try {
      await getProviderorSigner();
      setWalletConnected(true);
      console.log(walletConnected);
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className="button">
          Connect your wallet
        </button>
      );
    }
    if (loading) {
      return <button className="button">Loading...</button>;
    }

    return (
      <></>
    );
  };
  return (
    <>
      <div>
        <div className="main">
          <div>
            <h1 className="title">Welcome to MultiSender Token!</h1>
            <div className="description">
              On this plateform you can send Tokens & BNB on multiple address on just one click.
            </div>
            {renderButton()}
            {walletAddress ?<MultiSender/>: null}
          </div>
          {/* <div><img className="image" src="./LW3punks/1.png" /></div> */}
        </div>

        <footer className="footer">Made with &#10084; by Sameer</footer>
      </div>
    </>
  );
};

export default App;
