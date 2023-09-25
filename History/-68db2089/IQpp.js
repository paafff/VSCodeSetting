import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experiment from './pages/Experiment';
import AboutMe from './pages/AboutMe';
import ArticleCreate from './pages/ArticleCreate';
import Cobacoba from './components/Cobacoba';
import Articles from './pages/Articles';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiment" element={<Experiment />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/article/add" element={<ArticleCreate />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;