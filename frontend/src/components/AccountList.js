import React, { useState, useEffect } from 'react';
import { getAccounts } from '../services/api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name}: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
