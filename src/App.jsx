import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from '@/data/AppDataContext.jsx';
import TripsPage from '@/pages/TripsPage.jsx';
import OrdersPage from '@/pages/OrdersPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import TripDashboardPage from '@/pages/TripDashboardPage.jsx';

export default function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TripsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trips/:tripId/orders" element={<OrdersPage />} />
          <Route path="/trips/:tripId/dashboard" element={<TripDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppDataProvider>
  );
}