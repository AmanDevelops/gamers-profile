import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSuccess from "./pages/ProfileSuccess";

const ViewProfile = lazy(() => import("./pages/ViewProfile"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-profile" element={<Profile />} />
        <Route
          path="/profile/:username"
          element={
            <Suspense fallback={<div>Loading profile...</div>}>
              <ViewProfile />
            </Suspense>
          }
        />
        <Route path="/profile-success" element={<ProfileSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
