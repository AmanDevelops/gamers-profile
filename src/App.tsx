import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileSuccess = lazy(() => import("./pages/ProfileSuccess"));
const ViewProfile = lazy(() => import("./pages/ViewProfile"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-profile" element={<Profile />} />
          <Route path="/profile-success" element={<ProfileSuccess />} />
          <Route path="/profile/:username" element={<ViewProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
