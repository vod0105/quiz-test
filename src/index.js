import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Users from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Dashboard';
import ManageUsers from './components/Admin/ManageUsers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route index element={<HomePage />}></Route>
      <Route path='/users' element={<Users />}></Route>
      </Route>
      <Route path='admin' element={<Admin />}>
      <Route index element={<Dashboard />} ></Route>
      <Route path='manage-user' element={<ManageUsers />} ></Route>
      </Route>

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
