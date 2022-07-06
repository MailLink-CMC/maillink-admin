import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { login } from '../../../api/auth';
import { translateServerErrorMessage } from '../../../utils/translateServerErrorMessage';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    initialErrors: {
      id: '',
      password: '',
    },
    onSubmit: async (form) => {
      try {
        await login(form.id.trim(), form.password.trim());
        navigate('/dashboard/app', { replace: true });
      } catch (e) {
        setError(translateServerErrorMessage(e.response.data.reason));
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldError } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const setError = (error) => {
    setFieldError('password', error);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="id"
            label="ID"
            {...getFieldProps('id')}
            error={Boolean(touched.id && errors.id)}
            helperText={touched.id && errors.id}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}></Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
