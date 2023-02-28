import { useState } from 'react';
import { User } from '~/common/type';

export interface IUseAuthProvider {
    user: User | null;
    logIn: (user: User) => void;
    logOut: () => void;
}

const useAuthProvider = (): IUseAuthProvider => {
    const [user, setUser] = useState<User | null>(null);
    const logIn = (user: User) => setUser(user);
    const logOut = () => setUser(null);
    return {
        user,
        logIn,
        logOut,
    };
};
export default useAuthProvider;
