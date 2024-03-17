import FacebookLogin from '@greatsumini/react-facebook-login';
import { MdButton } from '@vagabond-inc/react-boilerplate-md';
import { useAuth } from '../../../hook/useAuth';

export interface ILoginFacebookProps {
  apiUrl: string;
  facebookClientId: string;
}

const LoginFacebook: React.FC<ILoginFacebookProps> = ({ apiUrl, facebookClientId }) => {
  const { handleFacebookLogin } = useAuth(apiUrl);

  return (
    <FacebookLogin
      appId={facebookClientId}
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
