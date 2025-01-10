import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useSnackbar from '@src/hooks/useSnackbar';
import { api } from '@src/lib/axios';
import { colors } from '@src/styles/colors';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Digite um e-mail válido.')
        .required('E-mail é obrigatório.'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post('/password/request-reset', {
          email: values.email,
        });
        if (response.status === 200) {
          showSnackbar({
            message: 'Código enviado para seu e-mail.',
            type: 'success',
          });
          navigate('/redefinir-senha');
        }
      } catch (error) {
        showSnackbar({
          message: 'Erro ao enviar o código. Tente novamente.',
          type: 'error',
        });
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar Senha
          </Typography>

          <Typography
            component="text"
            variant="body2"
            color={colors.chip.enableBorder}
            mt={2}
          >
            Insira o email cadastrado para receber o código de recuperação.
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar Código
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
            >
              Voltar
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" mt={5}>
            Já tenho um código:
          </Box>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => navigate('/redefinir-senha')}
          >
            Redefinir senha
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
