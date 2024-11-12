import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import DashboardPage from './components/DashboardPage';
import BudgetPage from './components/BudgetPage';
import ExpensesPage from './components/ExpensesPage';
import TransferPage from './components/TransferPage';
import AddOperationPage from './components/AddOperationPage';
import EditOperationPage from './components/EditOperationPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Appbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/add-operation" element={<AddOperationPage />} />
          <Route path="/edit-operation/:type/:id" element={<EditOperationPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
