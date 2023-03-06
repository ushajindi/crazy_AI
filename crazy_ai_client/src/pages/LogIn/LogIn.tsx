import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LogInStore } from "../../store/LogInStore/LogInStore";
import { observer } from "mobx-react";
import { useLocalStore } from '../../utils/useLocalStore';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Crazy AI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LogIn = () => {

  const logInStore = useLocalStore(() => new LogInStore());

  return (
    <ThemeProvider theme={theme}>
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
            Войти
          </Typography>
          <Box component="form" onSubmit={logInStore.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={logInStore.validator.emailInvalid}
              onBlur={logInStore.handleBlur}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {logInStore.validator.emailInvalid && <span style={{color: "red"}}>{logInStore.validator.emailMessage}</span>}
            <TextField
              error={logInStore.validator.passwordInvalid}
              onBlur={logInStore.handleBlur}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {logInStore.validator.passwordInvalid && <span style={{color: "red"}}>{logInStore.validator.passwordMessage}</span>}
            
            <FormControlLabel
              control={<Checkbox name='remember' value={true} color="primary" />}
              label="Запомнить меня?"
            />
            <div><span>Неверный логин или пароль</span></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={logInStore.validator.emailInvalid || logInStore.validator.passwordInvalid}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"У вас нет аккаунта? Регистрация"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default observer(LogIn);