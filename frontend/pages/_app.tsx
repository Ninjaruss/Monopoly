import * as React from 'react';
import { Moon, Sun, ArrowLeftCircle } from 'react-feather';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { useMounted } from '@hooks';
import { theme } from '@utils';

import ThemeContext, { useTheme } from '@contexts/ThemeContext';

import { Toggle } from '@components/Inputs';
import { Container } from '@components/Layouts';

import 'styles/fonts.css';
import 'styles/main.css';
import { useRouter } from 'next/router';
import AuthContextProvider, { useAuth } from '@contexts/AuthContext';

const AppContent = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  const mounted = useMounted();
  const [scheme, toggle] = useTheme();
  const { accessToken } = useAuth();

  if (!mounted) {
    return <></>;
  }

  if (
    !accessToken &&
    !router.route.includes('welcome') &&
    !router.route.includes('/auth')
  ) {
    router.push('/welcome');
    return <></>;
  }

  return (
    <ThemeProvider theme={{ mode: scheme }}>
      <Container gap={0}>
        {!router.route.includes('rooms/') && (
          <Container justify="space-between" row>
            <Container>
              <ArrowLeftCircle
                style={{
                  cursor:
                    router.route === '/' || router.route === '/welcome'
                      ? 'default'
                      : 'pointer',
                }}
                onClick={() =>
                  router.route !== '/' && router.route !== '/welcome'
                    ? router.back()
                    : {}
                }
                color={theme.cvar(
                  router.route === '/' || router.route === '/welcome'
                    ? 'colorBackground'
                    : 'colorForeground',
                )}
              />
            </Container>
            <Container row justify="flex-end">
              <Sun size={16} color={theme.cvar('colorForeground')} />
              <Toggle
                toggled={scheme === 'dark'}
                onChange={(): void => toggle()}
              />
              <Moon size={16} color={theme.cvar('colorForeground')} />
            </Container>
          </Container>
        )}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
};

const App = (props: AppProps): JSX.Element => {
  return (
    <ThemeContext>
      <AuthContextProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AppContent {...props} />
      </AuthContextProvider>
    </ThemeContext>
  );
};

export default App;
