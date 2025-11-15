import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '@/data/AppDataContext.jsx';
import OrdersTable from '@/components/OrdersTable.jsx';
import MapModal from '@/components/MapModal.jsx';
import EditOrderModal from '@/components/EditOrderModal.jsx';
import Header from '@/components/Header.jsx';

export default function OrdersPage() {
  const { tripId } = useParams();
  const { trips, setOrderLocation, updateOrderDetails, createOrder } = useAppData();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const trip = useMemo(() => trips.find(t => t.id === tripId), [trips, tripId]);
  const orders = trip?.orders || [];

  const openMapForOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsMapOpen(true);
  };

  const openEditForOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsEditOpen(true);
  };

  const closeMap = () => setIsMapOpen(false);
  const closeEdit = () => setIsEditOpen(false);

  const handleConfirm = (coords) => {
    if (!trip || !selectedOrderId) return;
    setOrderLocation(trip.id, selectedOrderId, { lat: coords.lat, lng: coords.lng });
    setIsMapOpen(false);
  };

  const handleSaveDetails = (changes) => {
    if (!trip || !selectedOrderId) return;
    updateOrderDetails(trip.id, selectedOrderId, changes);
    setIsEditOpen(false);
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const initialLocation = selectedOrder?.location || null;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleCreateOrder = () => {
    const name = window.prompt('Customer name');
    const tel = window.prompt('Tel');
    const locationName = window.prompt('Location (text)');
    const newId = createOrder(tripId, { name, tel, locationName, products: [] });
    setSelectedOrderId(newId);
    setIsEditOpen(true);
  };

  return (
    <>
      <Header showMaps={isMapOpen} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Orders for {trip?.name || tripId}</h1>
          <div className="flex items-center gap-2">
            <Link to={`/trips/${encodeURIComponent(tripId)}/dashboard`} className="bg-gray-700 hover:bg-black text-white px-3 py-2 rounded-md text-sm font-medium">Trip Dashboard</Link>
            <button onClick={handleCreateOrder} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium">Create Order</button>
          </div>
        </div>
        <OrdersTable orders={orders} onOpenMap={openMapForOrder} onEdit={openEditForOrder} />
      </div>

      <MapModal
        isOpen={isMapOpen}
        onClose={closeMap}
        initialLocation={initialLocation}
        onConfirm={handleConfirm}
        apiKey={apiKey}
      />

      <EditOrderModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        order={selectedOrder}
        onSave={handleSaveDetails}
      />
    </>
  );
}
