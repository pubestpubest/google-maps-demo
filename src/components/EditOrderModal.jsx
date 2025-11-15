import React, { useEffect, useState } from 'react';

const SKU_OPTIONS = [
  'VT Travel Big',
  'VT Travel Small',
  'VT Ready Big',
  'VT Ready Small',
];

export default function EditOrderModal({ isOpen, onClose, order, onSave }) {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [locationName, setLocationName] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isOpen || !order) return;
    setName(order.name || '');
    setTel(order.tel || '');
    setLocationName(order.locationName || '');
    setItems((order.products || []).map(p => ({ name: p.name, quantity: Number(p.quantity || 0) })));
  }, [isOpen, order]);

  const addItem = () => {
    setItems(prev => [...prev, { name: SKU_OPTIONS[0], quantity: 1 }]);
  };

  const updateItem = (idx, patch) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, ...patch } : it));
  };

  const removeItem = (idx) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const normalized = items
      .filter(it => it && it.name && Number(it.quantity) > 0)
      .map(it => ({ name: it.name, quantity: Number(it.quantity) }));
    onSave({ name, tel, locationName, products: normalized });
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Edit Order: {order.id}</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tel</label>
              <input className="w-full border rounded px-3 py-2" value={tel} onChange={e => setTel(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Location (text)</label>
              <input className="w-full border rounded px-3 py-2" value={locationName} onChange={e => setLocationName(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Items</h4>
              <button className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200" onClick={addItem}>Add Item</button>
            </div>
            <div className="space-y-2">
              {items.length === 0 && (
                <div className="text-sm text-gray-500">No items. Click "Add Item" to add.</div>
              )}
              {items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-7">
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={it.name}
                      onChange={e => updateItem(idx, { name: e.target.value })}
                    >
                      {SKU_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min={0}
                      className="w-full border rounded px-3 py-2"
                      value={it.quantity}
                      onChange={e => updateItem(idx, { quantity: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={() => removeItem(idx)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
