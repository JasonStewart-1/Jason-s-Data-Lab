// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "./pages/Index";
import InsightsPage from "./pages/InsightsPage";
import Week3Live from "./pages/Week3Live";
import Week4Live from "./pages/Week4Live";
import Week5Live from "./pages/Week5Live";
import Week7Live from "./pages/Week7Live";
import NotFound from "./pages/NotFound";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<IndexPage />} />

        {/* Other pages */}
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/week3" element={<Week3Live />} />
        <Route path="/week4" element={<Week4Live />} />
        <Route path="/week5" element={<Week5Live />} />
        <Route path="/week7" element={<Week7Live />} />

        {/* 404 catch-all (must be last) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
