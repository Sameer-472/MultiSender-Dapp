// import * as ethers from "ethers";

import { createContext, useEffect , useState} from "react";
import MultiSender from "./contract/MultiSender.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";


export const Context = createContext();

export const ContextProvider = ({ children }) => {
  // const {ethereum} = window
  const [walletAddress, setwalletAddress] = useState(null);
  const getContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        "0xCC66E60A151bA69D19c992F5987DAECaE3C32074",
        MultiSender.abi, provider
      );
      console.log(contract);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  // const MultiTokenSender = async(recipents , amount)=>{
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       "0x65D1Bb11e19e8e6eE0710562FD4Ed549cF748914",
  //       MultiSender.abi,
  //       signer
  //     );
  //     await contract.MultiTokenSender(recipents, amount);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const MultiBNBSender = async(recipents , amount , value)=>{
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x65D1Bb11e19e8e6eE0710562FD4Ed549cF748914",
        MultiSender.abi,
        signer
      );
      console.log(contract);
      await contract.multiBnbSender(recipents, amount , value);
    } catch (error) {
      console.log(error);
    }
  }

  const MultiTokenSender = async(tokenAddress , recipients , amount)=>{
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x65D1Bb11e19e8e6eE0710562FD4Ed549cF748914",
        MultiSender.abi,
        signer
      );
      console.log(contract);
      await contract.MultiTokenSender(tokenAddress, recipients, amount);
    } catch (error) {
      console.log(error);
    }
  }


  // useEffect(() => {
  //   getContract()
  // }, [])
  

  return (
    <>
      <Context.Provider
        value={{
          getContract,
          MultiBNBSender,
          setwalletAddress,
          MultiTokenSender,
          walletAddress
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
