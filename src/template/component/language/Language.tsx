import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface ILanguageProps {
  show?: boolean;
  hidden?: boolean;
}

export const Language: React.FC<ILanguageProps> = memo(({ show, hidden = true }) => {
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
    (event: SelectChangeEvent<string | undefined>) => {
      const value = event.target.value as string;
      i18n?.changeLanguage(value);
    },
    [i18n],
  );

  return (
    <>
      {show && (
        <FormControl size='small' sx={{ margin: '0 !important', padding: '0 !important' }}>
          <Select
            name='language'
            value={i18n.language}
            onChange={handleChangeLanguage}
            className={(hidden ? 'hidden-responsive ' : '') + 'select-language'}>
            <MenuItem value='fr'>fr</MenuItem>
            <MenuItem value='en'>en</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
});
