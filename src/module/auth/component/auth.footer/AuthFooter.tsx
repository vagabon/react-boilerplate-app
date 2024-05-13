import { MdGrid } from '@vagabond-inc/react-boilerplate-md/dist/md/component/grid/MdGrid';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { memo, useCallback } from 'react';
import { AuthFooterEnum } from './enum/AuthFooterEnum';

interface IAuthFooter {
  left: AuthFooterEnum;
  rigth: AuthFooterEnum;
}

export const AuthFooter: React.FC<IAuthFooter> = memo(({ ...rest }) => {
  const getLink = useCallback((type: AuthFooterEnum) => {
    switch (type) {
      case AuthFooterEnum.SIGNIN:
        return <MdLink label='AUTH:LOGIN.GET_ACCOUNT' href='/auth/signin' />;
      case AuthFooterEnum.SIGNUP:
        return <MdLink label='AUTH:LOGIN.NO_ACCOUNT' href='/auth/signup' />;
      case AuthFooterEnum.FORGETED_PASSWORD:
        return <MdLink label='AUTH:LOGIN.FORGET_PASSWORD' href='/auth/forget/password' />;
    }
  }, []);

  return (
    <MdGrid container style={{ marginTop: '15px' }}>
      <MdGrid item xs>
        {getLink(rest.left)}
      </MdGrid>
      <MdGrid item>{getLink(rest.rigth)}</MdGrid>
    </MdGrid>
  );
});
