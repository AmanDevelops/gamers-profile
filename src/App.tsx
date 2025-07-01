import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSuccess from "./pages/ProfileSuccess";
import ViewProfile from "./pages/ViewProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-profile" element={<Profile />} />
        <Route path="/profile/:username" element={<ViewProfile />} />
        <Route path="/profile-success" element={<ProfileSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
