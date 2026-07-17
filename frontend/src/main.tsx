import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Anuncios from "./pages/Anuncios";
import MyAnuncios from "./pages/MyAnuncios";
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout/>}>
              <Route path="/" element={<Navigate to="/home" replace/>}/>
              <Route path="/home" element={<Home/>}/> 
              <Route path="/anuncios" element={<Anuncios/>}/>
              <Route path="/meus-anuncios" element={<MyAnuncios/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);