import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/comments" element={<div>Comments</div>} />
            <Route path="/ask" element={<div>Ask</div>} />
            <Route path="/show" element={<div>Show</div>} />
            <Route path="/jobs" element={<div>Jobs</div>} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
