import { MdCard } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode } from 'react';
import { useRole } from './useRole';

export interface HasRoleProps {
  roles?: string[];
  notRroles?: string[];
  showError?: boolean;
  children: ReactNode;
  childrenIfNotAllowed?: ReactNode;
}

const HasRole: React.FC<HasRoleProps> = (props: HasRoleProps) => {
  const { hasUserRole } = useRole();

  return (
    <>
      {hasUserRole(props.roles, props.notRroles) && props.children}
      {!hasUserRole(props.roles, props.notRroles) && props.showError && !props.childrenIfNotAllowed && (
        <MdCard style={{ marginTop: '20px', textAlign: 'center' }}>
          Vous n&apos;êtes pas habilité à voir ce contenu.
        </MdCard>
      )}
      {!hasUserRole(props.roles, props.notRroles) && props.childrenIfNotAllowed && <>{props.childrenIfNotAllowed}</>}
    </>
  );
};

HasRole.defaultProps = {
  showError: true,
};

export default HasRole;
