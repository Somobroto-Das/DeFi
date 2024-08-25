import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, Button } from 'react-bootstrap';

const LendingPool = ({ provider }) => {
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit');
  const [message, setMessage] = useState('');

  const tokenAddress = "0xf95a409d0e071d8071a6018cd016f5a826892252"; // Replace with your Token contract address
  const lendingPoolAddress = "0x2491991bbadd21c2159326c9121284749d47d086"; // Replace with your LendingPool contract address
  const lendingPoolABI = []; // Replace with your LendingPool ABI

  const handleTransaction = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(lendingPoolAddress, lendingPoolABI, signer);

    try {
      let tx;
      if (action === 'deposit') {
        const tokenContract = new ethers.Contract(tokenAddress, ["function approve(address, uint256) public returns (bool)"], signer);
        await tokenContract.approve(lendingPoolAddress, ethers.utils.parseEther(amount));
        tx = await contract.deposit(ethers.utils.parseEther(amount));
      } else if (action === 'borrow') {
        tx = await contract.borrow(ethers.utils.parseEther(amount));
      } else if (action === 'repay') {
        tx = await contract.repay(ethers.utils.parseEther(amount));
      }
      
      await tx.wait();
      setMessage(`Transaction successful: ${tx.hash}`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="lending-pool">
      <h3>Lending Pool Actions</h3>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Action</Form.Label>
        <Form.Control as="select" value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="borrow">Borrow</option>
          <option value="repay">Repay</option>
        </Form.Control>
      </Form.Group>
      <Button onClick={handleTransaction} className="btn btn-success mt-3">Submit</Button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default LendingPool;
