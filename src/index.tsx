import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-08-30 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'casa',
          amount: 1000,
          createdAt: new Date('2021-08-09 09:00:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('transactions', () => {
      return [
        this.schema.all('transaction')
      ];
    });

    this.post('transactions', (sch, req) => {
      const data = JSON.parse(req.requestBody)

      return sch.create('transaction', data)
    })
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
