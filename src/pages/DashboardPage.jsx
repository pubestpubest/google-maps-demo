import React, { useMemo } from 'react';
import { useAppData } from '@/data/AppDataContext.jsx';
import Header from '@/components/Header.jsx';

export default function DashboardPage() {
  const { trips } = useAppData();

  const summary = useMemo(() => {
    const counts = {
      'VT Travel Big': 0,
      'VT Travel Small': 0,
      'VT Ready Big': 0,
      'VT Ready Small': 0,
    };
    for (const trip of trips) {
      for (const order of trip.orders) {
        for (const p of order.products || []) {
          if (p.name in counts) {
            counts[p.name] += Number(p.quantity || 0);
          }
        }
      }
    }
    return counts;
  }, [trips]);

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 border-b">Product</th>
                <th className="text-left px-4 py-3 border-b">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([name, qty]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{name}</td>
                  <td className="px-4 py-3 border-b font-mono">{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
