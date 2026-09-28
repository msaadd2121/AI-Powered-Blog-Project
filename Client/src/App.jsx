import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/admin/Login";
import Footer from "./Components/Footer";
import Blog from "./Components/Blog";
import Layout from "./Pages/admin/Layout";
import Dashboard from "./Pages/admin/Dashboard";
import AddBlog from "./Pages/admin/AddBlog";
import ListBlog from "./Pages/admin/ListBlog";
import Comments from "./Pages/admin/Comments";
import { Toaster } from "react-hot-toast";
import { AppProvider, useAppContext } from "../context/AppContext";

function AdminRoute() {
  const { token } = useAppContext();

  return token ? <Layout /> : <Login />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Toaster />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />

            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="addBlog" element={<AddBlog />} />
              <Route path="listBlog" element={<ListBlog />} />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Routes>

          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;