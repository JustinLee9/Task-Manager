import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashPage from "./routes/SplashPage";
import TodosPage from "./routes/TodosPage";
import DonePage from "./routes/DonePage";
import TodoDetails from "./routes/TodoDetails";
import NotFoundPage from "./routes/NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/done" element={<DonePage />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
