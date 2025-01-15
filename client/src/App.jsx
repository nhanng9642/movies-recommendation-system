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
import { RecommendationMovieList } from "./pages/RecommendationMovieList.jsx";
import { CastDetail } from "./pages/CastDetail.jsx";
import CastList from "./pages/CastList.jsx";
import CastListManyMovies from "./pages/CastListManyMovies.jsx";
import { UserProfileLayout } from "./pages/layout/UserProfileLayout.jsx";
import { FavoritePagnation } from "./pages/FavoritePagination.jsx";
import { RatingMoviesPagination } from "./pages/RatingMoviesPagination.jsx";

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
          <Route path="/movie/:id/cast" element={<CastList />} />
          <Route path="/cast/:id" element={<CastDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/profile" element={
                    <ProtectRoute>
                        <UserProfileLayout />
                    </ProtectRoute>
                }
          >
            <Route index element={<ProfilePage />} />
            <Route path="/profile/favorite-movie" element={<FavoritePagnation />} />
            <Route path="/profile/rating-movie" element={<RatingMoviesPagination />} />
          </Route>
          <Route path="/ai-search/movie/:id" element={<RecommendationMovieList />} />
          <Route path="/ai-search/cast/:id" element={<CastListManyMovies />} />

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
