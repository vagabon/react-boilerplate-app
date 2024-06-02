import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { IThemeContextDto, useThemeContent } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import { Translate } from '@vagabond-inc/react-boilerplate-md/dist/translate/component/Translate';
import { memo } from 'react';
import { Language } from '../../../../../template/component/language/Language';

export interface IProfileFormParamProps {}

export const ProfileFormParam: React.FC<IProfileFormParamProps> = memo(() => {
  const { mode, switchTheme } = useThemeContent() as IThemeContextDto;

  return (
    <>
      <div className='flex flex-row align-center space-between'>
        <MdTypo content='AUTH:FIELDS.MODE' component='b' />
        <IconClickable icon={mode === 'dark' ? 'sun' : 'moon'} callback={switchTheme(mode)} />
      </div>
      <MdDivider />
      <div className='flex flex-row align-center space-between'>
        <b>
          <Translate i18nKey='AUTH:FIELDS.LANGUAGE' />
        </b>
        <Language show />
      </div>
    </>
  );
});
