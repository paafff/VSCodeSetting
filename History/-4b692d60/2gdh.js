import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Report from './pages/Report';
import Authentication from './pages/Authentication';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
