import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Feed />} />
        <Route path=":postId" element={<PostDetails />} />
        <Route path="upload" element={<CreatePost />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
