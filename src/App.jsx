import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import OverviewPage from './pages/OverviewPage';
import CountryExplorerPage from './pages/CountryExplorerPage';
import CountryProfilePage from './pages/CountryProfilePage';
import CompareCountriesPage from './pages/CompareCountriesPage';
import EmissionsPage from './pages/EmissionsPage';
import PoliciesPage from './pages/PoliciesPage';
import MethodologiesPage from './pages/MethodologiesPage';
import OrganizationsPage from './pages/OrganizationsPage';
import DataSourcesPage from './pages/DataSourcesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="countries" element={<CountryExplorerPage />} />
          <Route path="countries/:id" element={<CountryProfilePage />} />
          <Route path="compare" element={<CompareCountriesPage />} />
          <Route path="emissions" element={<EmissionsPage />} />
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="methodologies" element={<MethodologiesPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="data-sources" element={<DataSourcesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
