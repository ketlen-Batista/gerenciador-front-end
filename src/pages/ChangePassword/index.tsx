import React, { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useSnackbar from '@src/hooks/useSnackbar';
import { api } from '@src/lib/axios';
import { colors } from '@src/styles/colors';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const defaultTheme = createTheme();

const ChangePassword = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleTogglePasswordConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      code: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Código é obrigatório.'),
      password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres.')
        .required('Senha é obrigatória.'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais.')
        .required('Confirmação de senha é obrigatória.'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post('/password/reset', {
          token: values.code,
          password: values.password,
        });
        if (response.status === 200) {
          showSnackbar({
            message: 'Senha redefinida com sucesso!',
            type: 'success',
          });
          navigate('/login');
        }
      } catch (error) {
        showSnackbar({
          message: 'Erro ao redefinir a senha. Tente novamente.',
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Redefinir Senha
          </Typography>

          <Typography
            component="text"
            variant="body2"
            color={colors.chip.enableBorder}
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Insira o código de verificação enviado para o email cadastrado,
            juntamente com a nova senha que deseja definir.
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
              id="code"
              label="Código"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirme a Nova Senha"
              type={showPasswordConfirm ? 'text' : 'password'}
              id="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm)
              }
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleTogglePasswordConfirm}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Redefinir
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/recuperar-senha')}
            >
              Voltar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;
