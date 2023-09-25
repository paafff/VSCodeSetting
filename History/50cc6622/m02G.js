import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<abou />} />
          <Route path="/lapor" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
