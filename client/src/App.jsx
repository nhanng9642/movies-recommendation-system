import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./utils/GuestRoute";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./pages/layout/AppLayout";
import SearchResult from "./pages/SearchResult";
import { PageNotFound } from "./pages/PageNotFound";
import ProtectRoute from "./utils/ProtectRoute";
import MovieDetail from "./pages/MovieDetail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
              <AppLayout />
          }
        >
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/profile" element={
                    <ProtectRoute>
                        <ProfilePage />
                    </ProtectRoute>
                }
          />
        </Route>

        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        <Route
          path="/verify-account"
          element={
            <ProtectRoute>
              <VerifyEmail />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
