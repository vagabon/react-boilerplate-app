import FacebookLogin from '@greatsumini/react-facebook-login';
import { MdButton, WindowUtils } from '@vagabond-inc/react-boilerplate-md';
import { useAuth } from '../../../hook/useAuth';

const FACEBOOK_CLIENT_ID = WindowUtils.getEnv('FACEBOOK_CLIENT_ID') as string;

const LoginFacebook: React.FC = () => {
  const { handleFacebookLogin } = useAuth();

  return (
    <FacebookLogin
      appId={FACEBOOK_CLIENT_ID}
      onSuccess={(response) => {
        handleFacebookLogin(response.accessToken);
      }}
      onFail={(error) => {
        console.error('Facebook Login Failed !', error);
      }}
      render={({ onClick }) => (
        <MdButton
          label='AUTH:LOGIN.FACEBOOK'
          variant='outlined'
          size='large'
          color='facebook'
          startIcon='facebook'
          callback={onClick}
          fullWidth
        />
      )}
    />
  );
};

export default LoginFacebook;
