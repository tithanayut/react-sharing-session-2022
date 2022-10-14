import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

function withGuard(Component: ComponentType): ComponentType {
  return function ComponentWithGuard(props) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to="/login" />;
    return <Component {...props} />;
  };
}

export default withGuard;
