import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./admin/Dashboard";
import RequireAuth from "./auth/RequireAuth";
import PersistLogin from "./auth/PersistLogin";
import UnAuthenticated from "./pages/UnAuthenticated";
import RequireAuthUser from "./auth/RequireAuthUser";
import OrdersPage from "./user/OrdersPage";
import AddressPage from "./user/AddressPage";
import UserLayout from "./components/UserLayout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";
import ProductsPage from "./admin/ProductsPage";
import AddProduct from "./admin/AddProduct";
import AllProductsWeb from "./pages/AllProductsWeb";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import CmsPage from "./cms/CmsPage";
import CmsLayout from "./cms/CmsLayout";
import Builder from "./cms/Builder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          {/* customer */}
          <Route element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="all-products" element={<AllProductsWeb />} />
            <Route path="product/:id" element={<SingleProductPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route element={<RequireAuthUser />}>
              <Route path="account/orders" element={<OrdersPage />} />
              <Route path="account/address" element={<AddressPage />} />
            </Route>
          </Route>

          {/* admin */}
          <Route path="admin" element={<AdminLogin />} />
          <Route element={<RequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cms" element={<CmsPage />} />
              <Route path="admin/products" element={<ProductsPage />} />
              <Route path="admin/products/create" element={<AddProduct />} />
            </Route>
            <Route element={<CmsLayout />}>
              <Route path="builder" element={<Builder />} />
            </Route>
          </Route>
          <Route path="unauth" element={<UnAuthenticated />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
