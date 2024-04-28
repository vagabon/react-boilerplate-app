import { MdCard } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, memo } from 'react';
import { useRole } from './useRole';

export interface HasRoleProps {
  roles?: string[];
  notRroles?: string[];
  showError?: boolean;
  children: ReactNode;
  childrenIfNotAllowed?: ReactNode;
}

const HasRole: React.FC<HasRoleProps> = memo(({ ...rest }) => {
  const { hasUserRole } = useRole();

  return (
    <>
      {hasUserRole(rest.roles, rest.notRroles) && rest.children}
      {!hasUserRole(rest.roles, rest.notRroles) && rest.showError && !rest.childrenIfNotAllowed && (
        <MdCard style={{ marginTop: '20px', textAlign: 'center' }}>
          Vous n&apos;êtes pas habilité à voir ce contenu.
        </MdCard>
      )}
      {!hasUserRole(rest.roles, rest.notRroles) && rest.childrenIfNotAllowed && <>{rest.childrenIfNotAllowed}</>}
    </>
  );
});

HasRole.defaultProps = {
  showError: true,
};

export default HasRole;
