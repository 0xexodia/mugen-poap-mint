import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x9e1373e7A48b9A9F82380bf9b031A81Cbe8a1865";
const CONTRACT_ABI = [
  "function mint() public",
  "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

export default function MugenPOAPMintPage() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [txStatus, setTxStatus] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      setProvider(_provider);
      setSigner(_signer);
    } else {
      alert("Please install MetaMask to continue.");
    }
  };

  const mintPOAP = async () => {
    if (!signer) return alert("Please connect your wallet first.");
    setTxStatus("Minting...");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.mint();
      await tx.wait();
      setTxStatus("✅ Mint successful! Check your wallet.");
    } catch (err) {
      console.error(err);
      setTxStatus("❌ Mint failed. Check console for details.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/mugen-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        textShadow: "0 1px 3px black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Mugen POAP Mint</h1>
      <p style={{ maxWidth: "600px", marginBottom: "1.5rem" }}>
        This POAP commemorates your presence at Mugen’s LA activation. Connect your wallet and mint below.
      </p>
      <button
        onClick={connectWallet}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          border: "none",
          cursor: "pointer"
        }}
      >
        Connect Wallet
      </button>
      <button
        onClick={mintPOAP}
        style={{
          backgroundColor: "#e11d48",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Mint POAP
      </button>
      {txStatus && <p style={{ marginTop: "1rem" }}>{txStatus}</p>}
    </div>
  );
}
