import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter >
      <Routes>
      <Route exact path="/" element={JSON.parse(localStorage.getItem('user')) ? <Home /> : <Register />}/>
        <Route exact path="/login" element={JSON.parse(localStorage.getItem('user')) ? <Navigate to="/" /> : <Login />} />
        <Route   exact path="/register" element={JSON.parse(localStorage.getItem('user')) ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
