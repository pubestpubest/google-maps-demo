import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [trips, setTrips] = useState([
    {
      id: 'TRIP-001',
      name: 'Morning Route',
      orders: [
        {
          id: 'ORD-1001',
          name: 'Alice',
          tel: '080-111-2222',
          locationName: 'Alice Home',
          products: [
            { id: 'P-1', name: 'VT Travel Big', quantity: 2 },
            { id: 'P-3', name: 'VT Ready Small', quantity: 4 },
          ],
          location: null, // coordinate
        },
        {
          id: 'ORD-1002',
          name: 'Bob',
          tel: '080-333-4444',
          locationName: 'Bob Office',
          products: [
            { id: 'P-2', name: 'VT Travel Small', quantity: 1 },
            { id: 'P-4', name: 'VT Ready Big', quantity: 2 },
          ],
          location: { lat: 16.469546, lng: 99.51592 },
        },
      ],
    },
    {
      id: 'TRIP-002',
      name: 'Afternoon Route',
      orders: [
        {
          id: 'ORD-2001',
          name: 'Charlie',
          tel: '080-555-6666',
          locationName: 'Warehouse 2',
          products: [
            { id: 'P-4', name: 'VT Ready Big', quantity: 3 },
          ],
          location: null,
        },
      ],
    },
  ]);

  const setOrderLocation = useCallback((tripId, orderId, location) => {
    setTrips(prev => prev.map(t => t.id === tripId ? {
      ...t,
      orders: t.orders.map(o => o.id === orderId ? { ...o, location } : o)
    } : t));
  }, []);

  const updateOrderDetails = useCallback((tripId, orderId, details) => {
    setTrips(prev => prev.map(t => t.id === tripId ? {
      ...t,
      orders: t.orders.map(o => o.id === orderId ? { ...o, ...details } : o)
    } : t));
  }, []);

  const value = useMemo(() => ({ trips, setTrips, setOrderLocation, updateOrderDetails }), [trips, setOrderLocation, updateOrderDetails]);
  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
