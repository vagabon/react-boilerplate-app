import { IconClickable, MdDivider, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { useCallback } from 'react';
import { CommonAction } from '../../../../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../../../../store/Store';
import Language from '../../../../../template/Language';

export interface IProfileFormParamProps {
  i18n?: i18nType;
}

const ProfileFormParam: React.FC<IProfileFormParamProps> = ({ i18n }) => {
  const { Trans } = useAppTranslate();
  const dispatch = useAppDispatch();
  const { modeTheme } = useAppSelector((state) => state.common);

  const handleChangeTheme = useCallback(
    (mode: string) => () => {
      dispatch(CommonAction.setModeTheme(mode === 'light' ? 'dark' : 'light'));
    },
    [dispatch],
  );

  return (
    <>
      <div className='flex flex-row align-center space-between'>
        <b>
          <Trans i18nKey='AUTH:FIELDS.MODE' />
        </b>
        <IconClickable icon={modeTheme === 'dark' ? 'sun' : 'moon'} callback={handleChangeTheme(modeTheme)} />
      </div>
      <MdDivider />
      {i18n && (
        <div className='flex flex-row align-center space-between'>
          <b>
            <Trans i18nKey='AUTH:FIELDS.LANGUAGE' />
          </b>
          <Language i18n={i18n} hidden={false} />
        </div>
      )}
    </>
  );
};

export default ProfileFormParam;
