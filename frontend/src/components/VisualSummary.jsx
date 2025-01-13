import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VisualSummary = ({ transactions }) => {
  // Categorize expenses and income
  const categories = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'expense') {
        acc.expenses += transaction.amount;
      } else {
        acc.income += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Transactions',
        data: [categories.income, categories.expenses],
        backgroundColor: ['#4CAF50', '#FF5733'],
        hoverBackgroundColor: ['#45a049', '#ff331f'],
        borderColor: ['#2e7d32', '#c62828'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Summary</h2>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default VisualSummary;
