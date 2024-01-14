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
    <div className='flex align-center' style={{ marginBottom: '10px' }}>
      <MdButton
        label='AUTH:LOGIN.GOOGLE'
        variant='outlined'
        color='google'
        startIcon='google'
        callback={handleGoogleLogin}
        sx={{ minWidth: '220px', marginBottom: '5px' }}
      />
    </div>
  );
};

export default LoginGoogle;
