import { Navigate, Route, Routes } from "react-router-dom";
import Layouts from "./layouts/layouts";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layouts showHero>
            <HomePage />
          </Layouts>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layouts showHero={false}>
            <SearchPage />
          </Layouts>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layouts showHero={false}>
            <DetailsPage />
          </Layouts>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layouts>
              <OrderStatusPage />
            </Layouts>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layouts>
              <UserProfilePage />
            </Layouts>
          }
        />

        <Route
          path="/restaurant"
          element={
            <Layouts>
              <ManageRestaurantPage />
            </Layouts>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
