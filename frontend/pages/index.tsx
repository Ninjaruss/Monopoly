import * as React from 'react';
import { useRouter } from 'next/router';

import { dayjs, hashids } from '@utils';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const Home = (): JSX.Element => {
  const router = useRouter();

  return (
    <Container align="center">
      <Text variant="h2">Welcome to the Online Monopoly Game</Text>
      <Container row>
        <Button
          size="xl"
          thickness="large"
          variant="secondary"
          onClick={() =>
            router.push(`/rooms/${hashids.encode(dayjs().unix().toString())}`)
          }
        >
          Create a new room
        </Button>
        <Button size="xl" thickness="large" variant="secondary">
          Join an existing room
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
