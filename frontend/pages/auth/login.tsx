import * as React from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button, TextField } from '@components/Inputs';

const Login = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Container align="center">
      <Text variant="h2">Login</Text>
      <Container>
        <TextField
          onChange={setEmail}
          placeholder="email"
          type="email"
          thickness="large"
        />
        <TextField
          onChange={setPassword}
          placeholder="password"
          type="password"
          thickness="large"
        />
        <Button size="xl" thickness="large" variant="secondary">
          Login
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
