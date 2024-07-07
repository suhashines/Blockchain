import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./contracts/Chai.json";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {

      const contractAddress = "0xBE7fC1A27105906744D0aC663a820c9CFeB91dEd";
      const contractAbi = abi.abi;

      console.log('abi '+contractAbi);

      try {
        

        if (window.etherium) {
          console.log("etherium found");

          const account = await etherium.request({
            method: "eth_requestAccounts",
          });
        

        const provider = new ethers.BrowserProvider(etherium);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress,contractAbi,signer);

        console.log("contract "+contract);

        setState({provider,signer,contract});
      }else{
        alert("Install metamask");
      }

      } catch (e) {
        console.error(e);
      }
    };

    connectWallet();


  },[]);

  return <div className="App">helloooo</div>;
}

export default App;
