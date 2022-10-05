import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/admin"
          element={
            JSON.parse(localStorage.getItem("admin")) ? <Home /> : <Register />
          }
        />
        <Route
          exact
          path="/admin/login"
          element={
            JSON.parse(localStorage.getItem("admin")) ? (
              <Navigate to="/admin" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/admin/register"
          element={
            JSON.parse(localStorage.getItem("admin")) ? (
              <Navigate to="/admin" />
            ) : (
              <Register />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
