import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = ({ setProvider }) => {
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setProvider(provider);
        setAddress(await signer.getAddress());
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('Please install MetaMask');
    }
  };

  return (
    <div className="wallet-connection">
      {address ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default ConnectWallet;
