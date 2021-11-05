import { useCallback } from 'react';

import {
  Grid,
  Button,
  TextField,
  Paper,
} from '@material-ui/core';

const LoginPage = () => {
  const loginWithGitHub = useCallback(() => {
    window.open(`https://github.com/login/oauth/authorize?client_id=a2891c4f7582630a21ae`)
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Username"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth> Login </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth color="primary" onClick={loginWithGitHub}>Entrar com GitHub</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;
