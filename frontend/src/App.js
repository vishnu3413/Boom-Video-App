import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginForm.jsx";
import VideoList from "./components/VideoList.jsx";
import VideoUpload from './components/VideoUpload.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserWallet from './components/UserWallet.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        toastClassName="dark:bg-primary dark:text-secondary bg-secondary text-orange-500"
      />
      <header className="p-4 flex justify-end border-b border-gray-200">
        <UserWallet />
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<VideoList />} />
        <Route path="/upload" element={<VideoUpload />} />
        <Route path="/videos/:id" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default App;
