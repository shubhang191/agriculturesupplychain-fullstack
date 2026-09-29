import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { FieldsView } from './pages/FieldsView';
import { FarmersView } from './pages/FarmersView';
import { SuppliersView } from './pages/SuppliersView';
import { CoopsView } from './pages/CoopsView';
import { BatchesView } from './pages/BatchesView';
import { StorageView } from './pages/StorageView';
import { ShipmentsView } from './pages/ShipmentsView';
import { BuyersView } from './pages/BuyersView';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="fields" element={<FieldsView />} />
          <Route path="farmers" element={<FarmersView />} />
          <Route path="suppliers" element={<SuppliersView />} />
          <Route path="coops" element={<CoopsView />} />
          <Route path="batches" element={<BatchesView />} />
          <Route path="storage" element={<StorageView />} />
          <Route path="shipments" element={<ShipmentsView />} />
          <Route path="buyers" element={<BuyersView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
