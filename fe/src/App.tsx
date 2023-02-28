import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Auth/login.page';
import SignupPage from './pages/Auth/signup.page';
import AuthProvider from './components/Authentication/auth';
import Profile from './pages/Profile';
import { RequireAuth } from './components/Authentication/RequireAuth';
import { DefaultLayout } from './Layout';
import { publicRoutes } from '~/routes';
function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = DefaultLayout || route.layout;
                    const Page = route.component;
                    if (route.wrap) {
                        const Wrap = route.wrap;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Wrap>
                                            <Page />
                                        </Wrap>
                                    </Layout>
                                }
                            />
                        );
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route
                    path="profile"
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
