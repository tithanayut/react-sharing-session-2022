import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './providers/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Content from './pages/Content';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Error from './components/Error';
import Layout from './components/Layout';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content/:id" element={<Content />} />
          <Route path="/content/:id/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<Create />} />
          <Route path="*" element={<Error message="Page Not Found" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
