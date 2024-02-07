import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import NewPage from './components/pages/NewPage';
import MemoPage from './components/pages/MemoPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/memo/:id" element={<MemoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
