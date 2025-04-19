import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageGallary from "./imageGallary";
import ImageDetails from "./imageDetails";
import 'react-toastify/ReactToastify.css';
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ImageGallary />} />
            <Route path="/:id" element={<ImageDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
