import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import DigitalLibraryPage from './pages/DigitalLibraryPage.jsx';
import SmartProcurementPage from './pages/SmartProcurementPage.jsx';
import MaterialPricePage from './pages/MaterialPricePage.jsx';
import AdminHomePage from './pages/AdminHomePage.jsx';
import AdminDataPage from './pages/AdminDataPage.jsx';
import AdminNewsPage from './pages/AdminNewsPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* 用户端页面 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/digital-library" element={<DigitalLibraryPage />} />
        <Route path="/smart-procurement" element={<SmartProcurementPage />} />
        <Route path="/material-price" element={<MaterialPricePage />} />
        
        {/* 管理端页面 */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/data" element={<AdminDataPage />} />
        <Route path="/admin/news" element={<AdminNewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
