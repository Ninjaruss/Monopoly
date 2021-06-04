import * as React from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const Welcome = (): JSX.Element => {
  const router = useRouter();

  return (
    <Container align="center">
      <Text variant="h2">Welcome to the Online Monopoly Game</Text>
      <Text variant="h4">
        You need to be registered to access all functionalities
      </Text>
      <Container row>
        <Button
          size="xl"
          thickness="large"
          onClick={() => router.push('/auth/login')}
        >
          Login
        </Button>
        <Button
          size="xl"
          thickness="large"
          variant="secondary"
          onClick={() => router.push('/auth/register')}
        >
          Register
        </Button>
      </Container>
    </Container>
  );
};

export default Welcome;
