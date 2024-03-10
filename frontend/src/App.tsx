import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";
import Signin from "./pages/Signin";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home</p>
            </Layout>
          }
        />
        <Route path="/search" element={<span>Search</span>} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
