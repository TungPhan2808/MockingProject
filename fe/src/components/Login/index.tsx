import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#512B52',
        fontWeight: 400,
    },
    '& .MuiInputBase-input': {
        borderColor: '#635274',
    },
    '& .MuiInput-underline:after': {
        border: 'none',
    },
    '& .MuiOutlineInput-root': {
        '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7BB0A8',
            },
        },
        '& fieldset': {
            borderColor: '#635274',
            borderRadius: 0,
        },
        '&:hover fieldset': {
            border: '1px solid #635274',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #635274',
        },
    },
});

type FormInputProps = {
    name: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <CssTextField
                    {...field}
                    {...otherProps}
                    variant="outlined"
                    sx={{ mb: '1.5rem' }}
                    error={!!errors[name]}
                    helperText={errors[name] ? (errors[name]?.message as unknown as string) : ''}
                />
            )}
        />
    );
};

export default FormInput;
