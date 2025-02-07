import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import Layout from './components/layout/Layout';
import LogsPage from './pages/LogsPage';
import StatsPage from './pages/StatsPage';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
