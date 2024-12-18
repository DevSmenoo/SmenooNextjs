import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Link from 'next/link';
import { LocaleProvider } from './context/LocaleContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <LocaleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Link href="/src/pages/index.jsx"></Link>} />
        <Route path="/menu/:id" element={<Link href="/src/pages/MenuPage.jsx"></Link>} />
      </Routes>
    </Router>
  </LocaleProvider>
);
