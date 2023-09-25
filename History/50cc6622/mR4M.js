import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CreateReport from './pages/Report';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<About />} />
          <Route path="/report" element={<CreateReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
