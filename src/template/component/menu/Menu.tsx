import { MdBouttonGroup } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/group/MdBouttonGroup';
import { MdMenuItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/item/MdMenuItem';
import { MdToolbar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/toolbar/MdToolbar';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileRole } from '../../../module/user/profile/component/role/ProfileRole';
import { IMenuDto } from '../../dto/menu/MenuDto';

export interface IMenuProps {
  menu: IMenuDto[];
}

export const Menu: React.FC<IMenuProps> = ({ menu }) => {
  const location = useLocation();
  const currentLocation = useMemo(() => location.pathname, [location]);

  return (
    <MdToolbar
      id='menu'
      sx={{
        justifyContent: 'center',
        borderBottom: 1,
        borderColor: 'divider',
      }}>
      <MdBouttonGroup variant='text' size='large'>
        {menu?.map((menu) => (
          <ProfileRole roles={menu.roles} key={menu.title} showError={false}>
            <MdMenuItem
              name={menu.title}
              url={menu.link}
              childrens={menu.childrens}
              currentLocation={currentLocation}
            />
          </ProfileRole>
        ))}
      </MdBouttonGroup>
    </MdToolbar>
  );
};
