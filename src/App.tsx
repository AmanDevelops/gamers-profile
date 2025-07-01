import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-profile" element={<Profile />} />
        <Route path="/profile/:username" element={<ViewProfile />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
