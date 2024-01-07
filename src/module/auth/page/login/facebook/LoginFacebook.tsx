import FacebookLogin from '@greatsumini/react-facebook-login';
import { MdButton, WindowUtils } from '@vagabond-inc/react-boilerplate-md';
import { useAuth } from '../../../hook/useAuth';

const FACEBOOK_CLIENT_ID: string = WindowUtils.getEnv('FACEBOOK_CLIENT_ID');

const LoginFacebook: React.FC = () => {
  const { handleFacebookLogin } = useAuth();

  return (
    <FacebookLogin
      appId={FACEBOOK_CLIENT_ID}
      onSuccess={(response) => {
        handleFacebookLogin(response.accessToken);
      }}
      onFail={(error) => {
        console.log('Facebook Login Failed !', error);
      }}
      render={({ onClick }) => (
        <div className='flex align-center margin-5'>
          <MdButton
            label='AUTH:LOGIN.FACEBOOK'
            variant='outlined'
            startIcon='facebook'
            callback={onClick}
            color='facebook'
          />
        </div>
      )}
    />
  );
};

export default LoginFacebook;
