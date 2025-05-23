import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PageEditor from './PageEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:pageName" element={<PageEditor />} />
        <Route path="*" element={<RedirectToNewPage />} />
      </Routes>
    </Router>
  );
}

function RedirectToNewPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const randomName = Math.random().toString(36).substring(2, 8);
    navigate(`/${randomName}`);
  }, [navigate]);

  return null;
}

export default App;
