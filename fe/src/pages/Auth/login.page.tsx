import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    Link as MuiLink,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { json, Link, useLocation } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '~/components/Login';
import styled from '@emotion/styled';
import Alert from '@mui/material';
import { useAuth } from '~/components/Authentication/auth';
import { User } from '~/common/type';
import { useNavigate } from 'react-router-dom';

export const LinkItem = styled(Link)`
    text-decoration: none;
    color: #635274;
    &:hover {
        text-decoration: none;
        color: #a7dbab;
    }
`;

export const OauthMuiLink = styled(MuiLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e4f5b1;
    border-radius: 1;
    padding: 0.6rem 0;
    column-gap: 1rem;
    text-decoration: none;
    color: #635274;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #e4f5b1;
        box-shadow: 0 1px 13px 0 rgb(0 0 0 /15%);
    }
`;

const loginSchema = object({
    email: string().min(1, 'Email in required').email('Email is invalid'),
    password: string()
        .min(1, 'Password in required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    persistUser: literal(true).optional(),
});

type ILogin = TypeOf<typeof loginSchema>;

const LoginPage: FC = () => {
    const [user, setUser] = useState<null | User>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.path || '/';

    const defaultValues: ILogin = {
        email: '',
        password: '',
    };

    const methods = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
        defaultValues,
    });

    const ParsedUser = object({
        email: string(),
        password: string(),
    });
    const onSubmitHandler: SubmitHandler<ILogin> = (value: ILogin) => {
        console.log(JSON.stringify(value));
        const parsedUser = ParsedUser.parse(value);
        setUser(parsedUser);
        auth?.logIn(parsedUser);
        navigate(redirectPath, { replace: true });
    };

    return (
        <Container
            maxWidth={false}
            sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: '100%', height: '100%' }}
            >
                <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
                    <FormProvider {...methods}>
                        <Grid
                            container
                            sx={{
                                boxShadow: { sm: '0 0 5px #ddd' },
                                py: '6rem',
                                px: '1rem',
                            }}
                        >
                            <Grid
                                item
                                container
                                justifyContent="space-between"
                                rowSpacing={5}
                                sx={{
                                    maxWidth: { sm: '45rem' },
                                    marginInline: 'auto',
                                }}
                            >
                                <Grid item xs></Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                        sx={{ paddingRight: { sm: '3rem' } }}
                                        onSubmit={methods.handleSubmit(onSubmitHandler)}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h1"
                                            sx={{ textAlign: 'center', mb: '1.5rem' }}
                                        >
                                            Log into your account
                                        </Typography>

                                        <FormInput
                                            label="Enter your email"
                                            type="email"
                                            name="email"
                                            focused
                                            required
                                        />
                                        <FormInput
                                            type="password"
                                            label="Password"
                                            name="password"
                                            required
                                            focused
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    aria-label="trust this device checkbox"
                                                    required
                                                    {...methods.register('persistUser')}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8rem',
                                                        fontWeight: 400,
                                                        color: '#5e5b5d',
                                                    }}
                                                >
                                                    Trust this device
                                                </Typography>
                                            }
                                        />

                                        <LoadingButton
                                            loading={false}
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                py: '0.8rem',
                                                mt: 2,
                                                width: '80%',
                                                marginInline: 'auto',
                                            }}
                                        >
                                            Login
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs></Grid>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontSize: '0.9rem',
                                            mb: '1rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Need an account?{' '}
                                        <LinkItem to="/signup">Sign up here</LinkItem>
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>
                                        Forgot your{' '}
                                        <LinkItem to="/forgotPassword">password?</LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
        </Container>
    );
};
export default LoginPage;
