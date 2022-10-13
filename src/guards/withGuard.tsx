import { ComponentType, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../providers/AuthProvider';

function withGuard(Component: ComponentType): ComponentType {
  return function ComponentWithGuard(props) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      if (!isLoggedIn) navigate('/login');
      setLoading(false);
    }, [isLoggedIn]);

    return isLoading ? <Loading /> : <Component {...props} />;
  };
}

export default withGuard;
