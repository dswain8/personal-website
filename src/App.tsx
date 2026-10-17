import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RadioShell from "./radio/RadioShell";
import PocketRadio from "./radio/PocketRadio";
import BuildRoom from "./radio/rooms/BuildRoom";
import QuietRoom from "./radio/rooms/QuietRoom";
import TryRoom from "./radio/rooms/TryRoom";
import LifeRoom from "./radio/rooms/LifeRoom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PmDojo from "./pages/PmDojo";
import PostcardDesk from "./pages/PostcardDesk";
import WonderJournal from "./pages/WonderJournal";
import LegacyShell from "./LegacyShell";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RadioShell />}>
          <Route path="/" element={<PocketRadio />} />
          <Route path="/build" element={<BuildRoom />} />
          <Route path="/quiet" element={<QuietRoom />} />
          <Route path="/try" element={<TryRoom />} />
          <Route path="/life" element={<LifeRoom />} />
          <Route path="/projects" element={<Navigate to="/try" replace />} />
          <Route path="/living" element={<Navigate to="/life" replace />} />
          <Route path="/stack" element={<Navigate to="/build" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<LegacyShell />}>
          <Route path="/wonder-journal" element={<WonderJournal />} />
          <Route path="/pm-dojo" element={<PmDojo />} />
          <Route path="/postcard-desk" element={<PostcardDesk />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-full" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
