import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QueuingPage from "./pages/QueuingPage";

import React from 'react';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/queue" element = {<QueuingPage/>}/>
        </Routes>
      </Router>
  );
}
export default App;