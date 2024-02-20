import { JSONObject, MdButton, MdInputTextSimple } from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMessage } from '../../../hook/message/useMessage';

export interface IAppInputWithButtonProps {
  label?: string;
  name?: string;
  localeIfEmpty?: string;
  callback?: (value: string) => void;
  value?: string;
}

const AppInputWithButton: React.FC<IAppInputWithButtonProps> = ({ label, name, localeIfEmpty, value, callback }) => {
  const { setMessage } = useMessage();
  const [nameValue, setNameValue] = useState<string>('');

  useEffect(() => {
    setNameValue(value ?? '');
  }, [value]);

  const handleChangeName = useCallback((event: ChangeEvent<JSONObject>) => {
    setNameValue(event.target['value' as keyof JSONObject]);
  }, []);

  const handleAdd = useCallback(
    (value: string, callback?: (value: string) => void) => () => {
      if (value && value !== '') {
        setNameValue(value);
        callback?.(value);
      } else {
        setMessage(localeIfEmpty ?? 'ERRORS:REQUIRED');
      }
    },
    [setMessage, localeIfEmpty],
  );

  const handleAddKeyUp = useCallback(
    (callback?: (value: string) => void) => (target?: { name: string; value: string }) => {
      if (target && target.value !== '') {
        setNameValue(target.value);
        callback?.(target.value);
      }
    },
    [],
  );

  return (
    <div className='flex flex-row input-add'>
      <MdInputTextSimple
        size='small'
        label={label ?? 'NAME'}
        name={name ?? 'name'}
        value={nameValue}
        handleBlur={handleChangeName}
        handleKeyEnter={handleAddKeyUp(callback)}
      />
      <MdButton icon='add' callback={handleAdd(nameValue, callback)} />
    </div>
  );
};

export default AppInputWithButton;
