import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // Адрес вашего бекенда
});

export const createAccount = (accountData) => api.post('/accounts/', accountData);
export const depositToAccount = (accountId, amount) => api.post(`/accounts/${accountId}/deposit`, { amount });
export const withdrawFromAccount = (accountId, amount) => api.post(`/accounts/${accountId}/withdraw`, { amount });
export const getAccounts = () => api.get('/accounts/');
