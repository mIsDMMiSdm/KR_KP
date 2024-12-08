import React, { useState } from 'react';
import { createAccount } from '../services/api';

const AccountForm = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount({ name, balance: parseFloat(balance) });
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account.');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Balance: </label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
