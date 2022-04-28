import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import { IndexPage } from 'pages/IndexPage';
import { PricesPage } from 'pages/PricesPage';
import { CalculatePage } from 'pages/CalculatePage';

export const App = () => {
  return (
    <div>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/pools" element={<PricesPage />} />
          <Route path="/calculate" element={<CalculatePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};
