import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import coffe from "./coffe1.png";
import "./App.css";

const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x682d2BbCBf541a356E3a78db9d53223B99959671";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress, contractABI, signer
          );
          console.log(contract);

          setAccount(account);
          setState({ provider, signer, contract });
        }
        else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, []);

  return (
    <div className="App">
      <img src={coffe} className="img" alt=""/>
      <p>
      Connected Account - {account}
      </p>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
