import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Projects } from './pages/Projects';
import { Certificates } from './pages/Certificates';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';

// Scroll to top on navigation helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper to conditionally hide navbar/footer in Admin panel
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin_hecate_v1');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

import { motion, AnimatePresence } from 'framer-motion';

// Animated wrapper for routes
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.995 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin_hecate_v1" element={<Admin />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <AnimatedRoutes />
      </AppLayout>
    </Router>
  );
};

export default App;
