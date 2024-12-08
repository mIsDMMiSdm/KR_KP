from fastapi import APIRouter, HTTPException
from app.models import Account

account_routes = APIRouter()

# Временная база данных
accounts = {}

@account_routes.post("/")
def create_account(account: Account):
    """Открыть новый счет"""
    if account.id in accounts:
        raise HTTPException(status_code=400, detail="Account already exists")
    accounts[account.id] = account
    return {"message": "Account created successfully", "account": account}

@account_routes.delete("/{account_id}")
def delete_account(account_id: int):
    """Удалить существующий счет"""
    if account_id not in accounts:
        raise HTTPException(status_code=404, detail="Account not found")
    del accounts[account_id]
    return {"message": "Account deleted successfully"}

@account_routes.get("/{account_id}")
def get_account(account_id: int):
    """Получить информацию о счете"""
    if account_id not in accounts:
        raise HTTPException(status_code=404, detail="Account not found")
    return accounts[account_id]

@account_routes.post("/{account_id}/deposit")
def deposit(account_id: int, amount: float):
    """Пополнить счет"""
    if account_id not in accounts:
        raise HTTPException(status_code=404, detail="Account not found")
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Deposit amount must be greater than zero")
    accounts[account_id].balance += amount
    return {"message": "Deposit successful", "new_balance": accounts[account_id].balance}

@account_routes.post("/{account_id}/withdraw")
def withdraw(account_id: int, amount: float):
    """Снять средства со счета"""
    if account_id not in accounts:
        raise HTTPException(status_code=404, detail="Account not found")
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Withdrawal amount must be greater than zero")
    if accounts[account_id].balance < amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    accounts[account_id].balance -= amount
    return {"message": "Withdrawal successful", "new_balance": accounts[account_id].balance}
