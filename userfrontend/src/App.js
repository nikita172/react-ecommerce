import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import "./app.css"

import HomePage from "./pages/homePage/HomePage"
import MenCloset from "./pages/menCloset/MenCloset"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import WomenCloset from "./pages/womenCloset/WomenCloset"
import KidCloset from "./pages/kidCloset/KidCloset"
import BeautyCloset from "./pages/beautyCloset/BeautyCloset"
import HomeLivingCloset from "./pages/homeLivingCloset/HomeLivingCloset"
import PreviewProduct from "./pages/previewProduct/PreviewProduct"
import WishList from "./pages/wishlist/WishList"
import Address from "./pages/address/Address"
import BagHandle from "./components/bagHandle/BagHandle"
import Orders from "./pages/orders/Orders"
function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <HomePage /> : <Register />} />
        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/men" element={user ? <MenCloset /> : <Register />}></Route>
        <Route path="/women" element={user ? <WomenCloset /> : <Register />}></Route>
        <Route path="/kid" element={user ? <KidCloset /> : <Register />}></Route>
        <Route path="/beauty" element={user ? <BeautyCloset /> : <Register />}></Route>
        <Route path="/homeandliving" element={user ? <HomeLivingCloset /> : <Register />}></Route>
        <Route path="/buy/:type/:id" element={user ? <PreviewProduct /> : <Register />}></Route>
        <Route path="/kid" element={user ? <KidCloset /> : <Register />}></Route>
        <Route path="/wishlist" element={user ? <WishList /> : <Register />}></Route>
        <Route path="/checkout/:cart" element={user ? <BagHandle /> : <Register />}></Route>
        <Route path="/checkout/:address" element={user ? <Address /> : <Register />}></Route>
        <Route path="/orders" element={user ? <Orders /> : <Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
