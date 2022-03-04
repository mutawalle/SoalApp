import React from "react";
import { Home, Login, Selesai, Soal } from ".";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function Rout() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/soal/:pelajaran/:jumlahSoal/:waktu/:kategori" element={<Soal/>}/>
          <Route path="/selesai" element={<Selesai/>}/>
        </Routes>
    </Router>
  );
}
