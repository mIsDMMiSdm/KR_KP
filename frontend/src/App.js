import React, { useState } from "react";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Account 1", deposit: 1000 },
    { id: 2, name: "Account 2", deposit: 500 },
  ]);

  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountDeposit, setNewAccountDeposit] = useState("");

  // Функция для снятия денег с аккаунта
  const withdrawMoney = (id, amount) => {
    if (isNaN(amount) || amount <= 0) {
      alert("Введите корректную сумму!");
      return;
    }

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? account.deposit >= amount
            ? { ...account, deposit: account.deposit - parseFloat(amount) }
            : (alert("Недостаточно средств!"), account)
          : account
      )
    );
  };

  // Функция для пополнения баланса
  const topUpMoney = (id, amount) => {
    if (isNaN(amount) || amount <= 0) {
      alert("Введите корректную сумму пополнения!");
      return;
    }

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? { ...account, deposit: account.deposit + parseFloat(amount) }
          : account
      )
    );
  };

  // Функция для добавления нового аккаунта
  const addAccount = () => {
    if (!newAccountName || isNaN(newAccountDeposit) || newAccountDeposit < 0) {
      alert("Введите корректное имя и сумму депозита!");
      return;
    }

    const newAccount = {
      id: accounts.length + 1,
      name: newAccountName,
      deposit: parseFloat(newAccountDeposit),
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountName("");
    setNewAccountDeposit("");
  };

  // Функция для удаления аккаунта
  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <div className="App">
      <h1>Система управления счетами</h1>

      {/* Список аккаунтов */}
      <div className="accounts">
        {accounts.map((account) => (
          <div key={account.id} className="account-card">
            <h3>{account.name}</h3>
            <p>Депозит: {account.deposit} ₽</p>
            <div className="buttons">
              <button
                onClick={() =>
                  withdrawMoney(
                    account.id,
                    prompt("Введите сумму для снятия:", "0")
                  )
                }
              >
                Снять
              </button>
              <button
                onClick={() =>
                  topUpMoney(
                    account.id,
                    prompt("Введите сумму для пополнения:", "0")
                  )
                }
              >
                Пополнить
              </button>
              <button
                className="delete-button"
                onClick={() => deleteAccount(account.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Добавление нового аккаунта */}
      <div className="add-account">
        <h2>Добавить новый аккаунт</h2>
        <input
          type="text"
          placeholder="Имя аккаунта"
          value={newAccountName}
          onChange={(e) => setNewAccountName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Начальный депозит"
          value={newAccountDeposit}
          onChange={(e) => setNewAccountDeposit(e.target.value)}
        />
        <button onClick={addAccount}>Добавить</button>
      </div>
    </div>
  );
}

export default App;
