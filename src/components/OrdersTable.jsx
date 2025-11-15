import React from 'react';
import { MapPin, Pencil } from 'lucide-react';

export default function OrdersTable({ orders, onOpenMap, onEdit }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-3 border-b">Order ID</th>
            <th className="text-left px-4 py-3 border-b">Name</th>
            <th className="text-left px-4 py-3 border-b">Tel</th>
            <th className="text-left px-4 py-3 border-b">Location</th>
            <th className="text-left px-4 py-3 border-b">Items</th>
            <th className="text-left px-4 py-3 border-b">Coordinate</th>
            <th className="text-left px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 border-b font-mono">{o.id}</td>
              <td className="px-4 py-3 border-b">{o.name}</td>
              <td className="px-4 py-3 border-b">{o.tel || '—'}</td>
              <td className="px-4 py-3 border-b">{o.locationName || '—'}</td>
              <td className="px-4 py-3 border-b">
                {o.products && o.products.length ? (
                  <div className="text-sm text-gray-700 space-y-1">
                    {o.products.map((p, idx) => (
                      <div key={idx}>{p.name} × {p.quantity}</div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 border-b">
                {o.location ? (
                  <span className="text-sm text-gray-700">
                    {o.location.lat.toFixed(6)}, {o.location.lng.toFixed(6)}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenMap(o.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium inline-flex items-center gap-2"
                  >
                    <MapPin size={16} /> Map
                  </button>
                  <button
                    onClick={() => onEdit(o.id)}
                    className="bg-gray-700 hover:bg-black text-white px-3 py-2 rounded-md text-sm font-medium inline-flex items-center gap-2"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
