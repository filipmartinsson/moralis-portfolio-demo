import React, {useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/Portfolio/Portfolio';
import Discovery from './pages/Discovery/Discovery';

import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Portfolio/>} />
          <Route path="/discovery" element={<Discovery/>} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
