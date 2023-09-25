import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experiment from './pages/Experiment';
import AboutMe from './pages/AboutMe';
import CreateArticle from './pages/CreateArticle';
import Cobacoba from './components/Cobacoba';
import Articles from './pages/Articles';
import ArticleDetail from './pages/DetailArticle';
import Authentication from './pages/Authentication';
import EditArticle from './pages/EditArticle';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import DetailProduct from './pages/DetailProduct';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiment" element={<Experiment />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:title" element={<ArticleDetail />} />
          <Route path="/article/create" element={<CreateArticle />} />
          <Route path="/articles/edit/:paramsTitle" element={<EditArticle />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/coba" element={<Cobacoba />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:uuid" element={<EditProduct />} />
          <Route path="/product/:uuid" element={<DetailProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
