import { useGoogleLogin } from '@react-oauth/google';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { memo } from 'react';
import { useAuth } from '../../../hook/useAuth';

export interface ILoginGoogleProps {
  apiUrl: string;
  urlRedirectLogin: string;
}

export const LoginGoogle: React.FC<ILoginGoogleProps> = memo(({ apiUrl, urlRedirectLogin }) => {
  const { handleGoogleLogin: doGoogleLogin } = useAuth(apiUrl, urlRedirectLogin);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      doGoogleLogin(codeResponse.access_token);
    },
    onError: (error) => console.error('Google Login Failed:', error),
  });

  return (
    <MdButton
      label='AUTH:LOGIN.GOOGLE'
      variant='outlined'
      size='large'
      color='google'
      startIcon='google'
      callback={handleGoogleLogin}
      fullWidth
    />
  );
});
