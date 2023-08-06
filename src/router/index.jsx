import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Mainlayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
const Router = () => (
  <React.Suspense>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/chat/:roomId" element={<Chat />}></Route>
    </Routes>
  </React.Suspense>
);
export default Router;
