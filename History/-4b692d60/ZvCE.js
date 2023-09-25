import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Report from './pages/Report';
import Authentication from './pages/Authentication';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Reports from './pages/Reports';

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
            <Route path="/reports" element={<Reports />} />
            <Route path='/coba' element={<cco}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
