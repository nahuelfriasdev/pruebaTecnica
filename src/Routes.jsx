import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;