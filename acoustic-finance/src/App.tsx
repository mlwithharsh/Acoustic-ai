import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Import theme
import theme from './theme/theme';

// Import layout
import Layout from './components/layout/Layout';

// Import pages
import Home from './pages/Home';
import TaxAssistant from './pages/TaxAssistant/TaxAssistant';
import FinanceCalculator from './pages/FinanceCalculator/FinanceCalculator';
import ScamDetection from './pages/ScamDetection/ScamDetection';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tax-assistant" element={<TaxAssistant />} />
            <Route path="/finance-calculator" element={<FinanceCalculator />} />
            <Route path="/scam-detection" element={<ScamDetection />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
