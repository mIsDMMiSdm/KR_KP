from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

class Account(BaseModel):
    id: str = None
    name: str
    deposit: float


accounts = []

@app.post("/accounts", response_model=List[Account])
def create_account(account: Account):
    account.id = str(uuid4())  # Генерация уникального ID для аккаунта
    accounts.append(account)
    return accounts

@app.get("/accounts", response_model=List[Account])
def get_accounts():
    return accounts

@app.delete("/accounts/{account_id}", response_model=List[Account])
def delete_account(account_id: str):
    global accounts
    accounts = [account for account in accounts if account.id != account_id]
    return accounts

@app.post("/withdraw", response_model=List[Account])
def withdraw_money(account_id: str, amount: float):
    account = next((acc for acc in accounts if acc.id == account_id), None)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    if account.deposit < amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    account.deposit -= amount
    return accounts

@app.post("/deposit", response_model=List[Account])
def deposit_money(account_id: str, amount: float):
    account = next((acc for acc in accounts if acc.id == account_id), None)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    account.deposit += amount
    return accounts
