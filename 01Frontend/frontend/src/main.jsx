import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Select from "./components/Select/Select.jsx";
import Room from "./components/Room/Room.jsx";
// import Evaluation from "./components/Evaluation/Evaluation.jsx";
import Summary from "./components/Summary/Summary.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Home from "./components/Home/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select" element={<Select />} />
        {/* <Route path="/evaluation" element={<Evaluation />} /> */}
        <Route path="/summary" element={<Summary/>} />
        <Route path="/profile" element={<Profile/>} />
      </Route>
      <Route path="/interview" element={<Room />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
