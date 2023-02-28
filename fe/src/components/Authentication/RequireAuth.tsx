import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

interface Props {
    children: React.ReactNode;
}

export const RequireAuth: FC<Props> = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth?.user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return <div>{children}</div>;
};
