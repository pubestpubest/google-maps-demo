import React from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '@/data/AppDataContext.jsx';
import Header from '@/components/Header.jsx';

export default function TripsPage() {
  const { trips } = useAppData();

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Trips</h1>
          <Link to="/dashboard" className="bg-gray-800 hover:bg-black text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 border-b">Trip ID</th>
                <th className="text-left px-4 py-3 border-b">Name</th>
                <th className="text-left px-4 py-3 border-b">Orders</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b font-mono">{t.id}</td>
                  <td className="px-4 py-3 border-b">{t.name}</td>
                  <td className="px-4 py-3 border-b">{t.orders.length}</td>
                  <td className="px-4 py-3 border-b space-x-2">
                    <Link
                      to={`/trips/${encodeURIComponent(t.id)}/orders`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      View Orders
                    </Link>
                    <Link
                      to={`/trips/${encodeURIComponent(t.id)}/dashboard`}
                      className="bg-gray-700 hover:bg-black text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Trip Dashboard
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
