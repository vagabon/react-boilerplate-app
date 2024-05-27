import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { PropsWithChildren, ReactNode, memo } from 'react';
import { useProfile } from '../../hook/useProfile';

export interface IProfileRoleProps extends PropsWithChildren {
  roles?: string[];
  notRoles?: string[];
  showError?: boolean;
  childrenIfNotAllowed?: ReactNode;
}

export const ProfileRole: React.FC<IProfileRoleProps> = memo(({ showError = true, ...rest }) => {
  const { hasUserRole } = useProfile();

  return (
    <>
      {hasUserRole(rest.roles, rest.notRoles) && rest.children}
      {!hasUserRole(rest.roles, rest.notRoles) && showError && !rest.childrenIfNotAllowed && (
        <MdCard style={{ marginTop: '20px', textAlign: 'center' }}>
          Vous n&apos;êtes pas habilité à voir ce contenu.
        </MdCard>
      )}
      {!hasUserRole(rest.roles, rest.notRoles) && rest.childrenIfNotAllowed && <>{rest.childrenIfNotAllowed}</>}
    </>
  );
});
