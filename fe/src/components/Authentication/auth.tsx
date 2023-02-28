import { createContext, FC, useContext } from 'react';
import useAuthProvider, { IUseAuthProvider } from './useAuthProvider';

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<IUseAuthProvider | null>(null);

const AuthProvider = ({ children }: Props) => {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
