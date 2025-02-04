import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile-page/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostTable from "./pages/admin/PostTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
function App() {

  const { user } = useSelector((state) => state.auth);


  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />

      <Header />

      <Routes>

        {/* Home page Route */}
        <Route path="/" element={<Home />} />

        {/* Login page Route */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />

        {/* Register page Route */}
        <Route path="/register" element={!user ? <Register /> : <Navigate to={"/"} />} />

        {/* Verify Email page Route */}
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to={"/"} />} />

        {/* Forgot Password page Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Reset Password page Route */}
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />

        {/* Profile page Route */}
        <Route path="/profile/:id" element={<Profile />} />



        {/* Posts page Route */}
        <Route path="/posts" element={<PostsPage />} />

        {/* Create Post page Route */}
        <Route path="/posts/create-post" element={user ? <CreatePost /> : <Navigate to={"/"} />} />

        {/* Post Details page Route */}
        <Route path="/posts/details/:id" element={<PostDetails />} />

        {/* Categories page Route */}
        <Route path="/posts/categories/:category" element={<Category />} />




        {/* Adimn Dashboard page Route */}
        <Route path="/admin-dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />} />

        {/* Users Table page Route */}
        <Route path="/admin-dashboard/users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />} />

        {/* Posts Table page Route */}
        <Route path="/admin-dashboard/posts-table" element={user?.isAdmin ? <PostTable /> : <Navigate to={"/"} />} />

        {/* Categories Table page Route */}
        <Route path="/admin-dashboard/categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to={"/"} />} />

        {/* Comments Table page Route */}
        <Route path="/admin-dashboard/comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to={"/"} />} />




        {/* Not found page */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
