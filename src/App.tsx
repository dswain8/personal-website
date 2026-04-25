import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Build from "./pages/Build";
import PmDojo from "./pages/PmDojo";
import PostcardDesk from "./pages/PostcardDesk";
import Stack from "./pages/Stack";
import Living from "./pages/Living";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<Build />} />
          <Route path="/pm-dojo" element={<PmDojo />} />
          <Route path="/postcard-desk" element={<PostcardDesk />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/living" element={<Living />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
