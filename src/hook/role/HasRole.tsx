import { MdBox } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode } from 'react';
import { useRole } from './useRole';

export interface HasRoleProps {
  roles?: string[];
  showError?: boolean;
  children: ReactNode;
  childrenIfNotAllowed?: ReactNode;
}

const HasRole: React.FC<HasRoleProps> = (props: HasRoleProps) => {
  const { hasUserRole } = useRole();

  return (
    <>
      {hasUserRole(props.roles) && props.children}
      {!hasUserRole(props.roles) && props.showError && !props.childrenIfNotAllowed && (
        <MdBox sx={{ marginTop: '20px', textAlign: 'center' }}>Vous n&apos;êtes pas habilité à voir ce contenu.</MdBox>
      )}
      {!hasUserRole(props.roles) && props.childrenIfNotAllowed && <>{props.childrenIfNotAllowed}</>}
    </>
  );
};

HasRole.defaultProps = {
  showError: true,
};

export default HasRole;
