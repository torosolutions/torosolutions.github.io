import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import IdPhotoTool from './pages/IdPhotoTool';
import DevTools from './pages/DevTools';
import MainLayout from './components/templates/MainLayout';

function App() {
  const location = useLocation();

  // Scroll to top on route change, unless a page has stamped a `section`
  // param onto the URL (e.g. dev-tools remembering which panel the user was
  // last in) — in that case scroll there instead. Centralized here (rather
  // than duplicated per-page) because this effect, sitting at the app root,
  // always fires last among mount effects — after any page-level effects —
  // so by the time it runs the target element is guaranteed to exist.
  useEffect(() => {
    const sectionId = new URLSearchParams(location.search).get('section');
    const target = sectionId ? document.getElementById(sectionId) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname.startsWith('/id-photo')) {
      document.title =
        'People ID Photo Cropper & Passport Maker (2x3, 4x6, 3x2) | Toro Solutions';
    } else if (location.pathname.startsWith('/dev-tools')) {
      document.title =
        'Developer Utility Suite - String, Email, Base64, UUID & Hashes | Toro Solutions';
    } else {
      document.title =
        'Toro Solutions | Innovative Software Solutions & Free Web Utilities';
    }
  }, [location.pathname]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/id-photo" element={<IdPhotoTool />} />
        <Route path="/dev-tools" element={<DevTools />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
