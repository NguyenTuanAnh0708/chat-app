import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Mainlayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
const Router = () => (
  <React.Suspense>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </React.Suspense>
);
export default Router;
