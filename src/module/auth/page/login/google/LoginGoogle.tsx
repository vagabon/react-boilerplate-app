import { useGoogleLogin } from '@react-oauth/google';
import { MdButton } from '@vagabond-inc/react-boilerplate-md';
import { useAuth } from '../../../hook/useAuth';

const LoginGoogle: React.FC = () => {
  const { handleGoogleLogin: doGoogleLogin } = useAuth();

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
};

export default LoginGoogle;
