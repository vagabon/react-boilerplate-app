import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IListDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/list/ListDto';
import { MdFormSelect } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/select/MdFormSelect';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface ILanguageProps {
  fullWidth?: boolean;
  show?: boolean;
}

export const Language: React.FC<ILanguageProps> = memo(({ fullWidth = false, show = true }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    let navigatorLanguage = navigator?.language?.split('-')?.[0] ?? 'en';
    if (navigatorLanguage !== 'fr' && navigatorLanguage !== 'en') {
      navigatorLanguage = 'en';
    }
    const language = localStorage.getItem('i18nextLng') ?? navigatorLanguage;
    i18n?.changeLanguage(language);
  }, [i18n]);

  const handleChangeLanguage = useCallback(
    (value?: string | JSONObject) => {
      i18n?.changeLanguage(String(value));
    },
    [i18n],
  );

  return (
    <>
      {show && (
        <MdFormSelect
          name='langugage'
          values={{ langugage: i18n.language }}
          callBack={handleChangeLanguage}
          className={'select-language'}
          list={
            [
              { id: 'fr', libelle: 'fr' },
              { id: 'en', libelle: 'en' },
            ] as IListDto[]
          }
          defaultValue={false}
          fullWidth={fullWidth}
        />
      )}
    </>
  );
});
