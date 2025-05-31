import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import WhitepaperPage from './pages/WhitepaperPage';
import SocialHubPage from './pages/SocialHubPage';
import MerchPage from './pages/MerchPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/whitepaper" element={<WhitepaperPage />} />
            <Route path="/social" element={<SocialHubPage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;