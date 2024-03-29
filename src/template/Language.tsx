import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { type i18n as i18nType } from 'i18next';
import { useCallback } from 'react';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';

export interface ILanguageProps {
  i18n?: i18nType;
  hidden?: boolean;
}

const Language: React.FC<ILanguageProps> = ({ i18n, hidden = true }) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.common);

  const handleChangeLanguage = useCallback(
    (event: SelectChangeEvent<string | undefined>) => {
      const value = event.target.value as string;
      i18n?.changeLanguage(value);
      dispatch(CommonAction.setLanguage(value));
    },
    [i18n, dispatch],
  );
  return (
    <FormControl size='small' sx={{ margin: '0 !important', padding: '0 !important' }}>
      <Select
        value={language}
        onChange={handleChangeLanguage}
        className={(hidden ? 'hidden-responsive ' : '') + 'select-language'}>
        <MenuItem value='fr'>fr</MenuItem>
        <MenuItem value='en'>en</MenuItem>
      </Select>
    </FormControl>
  );
};
export default Language;
