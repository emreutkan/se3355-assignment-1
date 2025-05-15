import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainPage from './pages/MainPage';
import './App.css';

const NewsDetailPage: React.FC = () => {

  return (
      <div className="news-detail-container">
        <h1>News Detail Page</h1>
        <a href="/">Back to Home</a>
      </div>
  );
};

function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/haber/:newsId" element={<NewsDetailPage />} />
            </Routes>
          </div>
        </Router>
      </Provider>
  );
}

export default App;