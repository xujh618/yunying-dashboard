import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DigitalLibraryPage from './pages/DigitalLibraryPage';
import SmartProcurementPage from './pages/SmartProcurementPage';
import MaterialPricePage from './pages/MaterialPricePage';
import AdminHomePage from './pages/AdminHomePage';
import AdminDataPage from './pages/AdminDataPage';
import AdminNewsPage from './pages/AdminNewsPage';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/digital-library" element={<DigitalLibraryPage />} />
            <Route path="/smart-procurement" element={<SmartProcurementPage />} />
            <Route path="/material-price" element={<MaterialPricePage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/data" element={<AdminDataPage />} />
            <Route path="/admin/news" element={<AdminNewsPage />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;