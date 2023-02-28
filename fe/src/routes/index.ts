import Home from '~/pages/Home';
import LoginPage from '~/pages/Auth/login.page';
import SignupPage from '../pages/Auth/signup.page';
import Profile from '~/pages/Profile';
import { RequireAuth } from '../components/Authentication/RequireAuth';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile, wrap: RequireAuth, layout: null },
];

const privateRoutes = [
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
];

export { publicRoutes };
