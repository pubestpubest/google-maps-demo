import React, { useState } from 'react';
import OrdersTable from '@/components/OrdersTable.jsx';
import MapModal from '@/components/MapModal.jsx';

export default function HomePage() {
  const [orders, setOrders] = useState([
    { id: 'ORD-1001', name: 'Alice', details: '2x Widgets', location: null },
    { id: 'ORD-1002', name: 'Bob', details: '1x Gadget', location: { lat: 16.469546, lng: 99.51592 } },
    { id: 'ORD-1003', name: 'Charlie', details: '3x Thingamajig', location: null },
  ]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const openMapForOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (coords) => {
    if (!selectedOrderId) return;
    setOrders(prev => prev.map(o => (
      o.id === selectedOrderId ? { ...o, location: { lat: coords.lat, lng: coords.lng } } : o
    )));
    setToast(`${selectedOrderId}: Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)}`);
    setTimeout(() => setToast(null), 3000);
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const initialLocation = selectedOrder?.location || null;

  return (
    <>
      <OrdersTable orders={orders} onOpenMap={openMapForOrder} />

      <MapModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialLocation={initialLocation}
        onConfirm={handleConfirm}
        apiKey={apiKey}
      />

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up z-50">
          <div>
            <p className="font-medium">Coordinates</p>
            <p className="text-sm opacity-90">{toast}</p>
          </div>
        </div>
      )}
    </>
  );
}
