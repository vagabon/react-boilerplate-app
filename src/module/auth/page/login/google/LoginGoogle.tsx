import { useGoogleLogin } from '@react-oauth/google';
import { MdButton } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import { useAuth } from '../../../hook/useAuth';

export interface ILoginGoogleProps {
  apiUrl: string;
}

const LoginGoogle: React.FC<ILoginGoogleProps> = memo(({ apiUrl }) => {
  const { handleGoogleLogin: doGoogleLogin } = useAuth(apiUrl);

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

export default LoginGoogle;
