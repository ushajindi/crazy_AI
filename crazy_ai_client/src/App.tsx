import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";

const App = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App;