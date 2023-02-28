import { Component, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Authentication/auth';

const Profile = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogOut = () => {
        auth?.logOut();
        navigate('/login');
    };
    return (
        <div>
            Welcome <>{auth?.user && auth?.user.email}</>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
};

export default Profile;
