import { Container, Grid, Box, Typography, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '~/components/Login';
import { LinkItem, OauthMuiLink } from './login.page';

const signupSchema = object({
    name: string().min(1, 'Name is requires').max(70),
    email: string().min(1, 'Email is required').email('Email is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
});

type ISignUp = TypeOf<typeof signupSchema>;

const SignupPage: FC = () => {
    const defaultValues: ISignUp = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    const methods = useForm<ISignUp>({
        resolver: zodResolver(signupSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
        console.log(JSON.stringify(values, null, 4));
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
                    <Grid
                        container
                        sx={{
                            boxShadow: { sm: '0 0 5px #ddd' },
                            py: '6rem',
                            px: '1rem',
                        }}
                    >
                        <FormProvider {...methods}>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    mb: '1.5rem',
                                    pb: { sm: '3rem' },
                                }}
                            >
                                Welcome to our Shop
                            </Typography>
                            <Grid
                                item
                                container
                                rowSpacing={5}
                                justifyContent="space-between"
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
                                            Create your new account
                                        </Typography>
                                        <FormInput label="Name" type="text" name="name" required />
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            required
                                        />
                                        <FormInput
                                            label="Password"
                                            type="password"
                                            name="password"
                                            required
                                        />
                                        <FormInput
                                            label="Confirm Password"
                                            type="password"
                                            name="passwordConfirm"
                                            required
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
                                            Sign up
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs></Grid>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                                        Already have an account?{' '}
                                        <LinkItem to="/login">Login</LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </FormProvider>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignupPage;
