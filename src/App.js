import './tailwind.css';
import './index.css';
import RechargeForm from './components/RechargeForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const url = 'https://punto-red-backend-production.up.railway.app';

  const getTransactions = async () => {
    try {
      const response = await axios.get(url+'/transaction/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <RechargeForm onSuccessfulBuy={getTransactions} />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Transacciones realizadas</h2>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.transactionalId} className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm">Transacción: Recarga de ${transaction.value} a {transaction.cellPhone}</p>
                  <p className="text-xs text-gray-500">ID: {transaction.transactionalId}</p>
                  <p className="text-xs text-gray-500">Fecha: {new Date(transaction.transactionDate).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Mensaje: {transaction.message}</p>
                </div>
              ))
            ) : (
              <p>No hay transacciones realizadas aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
