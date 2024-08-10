import React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function BarChartDashboard({ BudgetList }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart
          data={BudgetList}
          margin={{
            top:7
          }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a0aec0' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a0aec0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2d3748', 
              border: 'none', 
              borderRadius: '4px', 
              color: '#e2e8f0' 
            }}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px', 
              color: '#e2e8f0' 
            }}
          />
          <Bar 
            dataKey="totalSpend" 
            stackId="a" 
            fill="#4FD1C5" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="amount" 
            stackId="a" 
            fill="#81E6D9" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;