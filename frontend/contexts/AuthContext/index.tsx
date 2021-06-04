import * as React from 'react';
import { useRouter } from 'next/router';

import { useLocalStorage } from '@hooks';
import { api } from '@services';

interface IAuthContext {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  login: (
    email: string,
    password: string,
    onLogin: (isAdmin: boolean) => void,
    onError: () => void,
  ) => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AuthContext: React.Context<IAuthContext> = React.createContext();

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    'accessToken',
    'toto',
  );
  const router = useRouter();

  React.useEffect(() => {
    api.initAxios(accessToken);
  }, [accessToken]);

  const login = (
    email: string,
    password: string,
    onLogin: (isAdmin: boolean) => void,
    onError: () => void,
  ): void => {
    api
      .login(email, password)
      .then((res) => {
        if (res?.access_token) {
          setAccessToken(res.access_token);
          onLogin(res.role === 'admin');
        } else {
          onError();
        }
      })
      .catch(() => onError());
  };

  const logout = (): void => {
    setAccessToken(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext =>
  React.useContext<IAuthContext>(AuthContext);

export default AuthContextProvider;
