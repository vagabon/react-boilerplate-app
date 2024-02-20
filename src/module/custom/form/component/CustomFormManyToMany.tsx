import {
  I18nUtils,
  IApiDto,
  ID,
  IFormPropsDto,
  JSONObject,
  MdButton,
  MdChip,
  MdFormError,
  MdTypo,
  SetFieldValueType,
  useAppTranslate,
  useFormError,
} from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { useMessage } from '../../../../hook/message/useMessage';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import CustomFormModale from './CustomFormModale';

export interface ICustomFormManyToManyProps extends IFormPropsDto {
  conf: IFormDto;
  label: string;
  name: string;
}

const CustomFormManyToMany: React.FC<ICustomFormManyToManyProps> = ({ conf, label, name, ...rest }) => {
  const { t } = useAppTranslate();
  const { message } = useMessage();
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<IApiDto[]>();
  const { error } = useFormError(name, rest.errors, rest.touched, message?.message);

  const validationSchema = rest.validationSchema?.[name as keyof JSONObject] ?? {};

  useEffect(() => {
    setDatas(rest.values[name as keyof JSONObject] as IApiDto[]);
  }, [rest.values, name]);

  const handleSelectData = useCallback(
    (oldDatas?: IApiDto[], callback?: SetFieldValueType) => (data: IApiDto) => () => {
      const newDatas = [...(oldDatas ?? [])];
      if (!newDatas.find((oneData) => oneData.id === data.id)) {
        newDatas.push(data);
      }
      setDatas(newDatas);
      callback?.(name, newDatas);
      setOpen(false);
    },
    [name],
  );

  const handleDelete = useCallback(
    (id: ID, oldDatas: IApiDto[], callback: SetFieldValueType) => () => {
      if (id && oldDatas) {
        const newDatas = oldDatas.filter((oneData: IApiDto) => oneData.id !== id);
        setDatas(newDatas);
        callback(name, newDatas);
      }
    },
    [name],
  );

  const handleModalOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleModalClose = useCallback((): void => {
    setOpen(false);
  }, []);

  return (
    <>
      <div className='flex m2m width100'>
        <div>
          <MdTypo paragraph={true} sx={{ marginLeft: '10px' }}>
            {I18nUtils.translate(t, label)}
            {validationSchema['required'] ? ' *' : ''}
          </MdTypo>
          <div>
            {datas?.map((data: IApiDto) => (
              <MdChip
                key={data.id}
                label={(data?.[conf.m2m?.name as keyof IApiDto] as string) ?? ''}
                callbackDelete={handleDelete(data.id, datas, rest.setFieldValue)}
              />
            ))}
            <MdButton callback={handleModalOpen} icon='add' />
          </div>
        </div>

        <MdFormError error={error} />
      </div>
      <CustomFormModale
        conf={conf.m2m}
        open={open}
        handleClose={handleModalClose}
        handleSelect={handleSelectData(datas, rest.setFieldValue)}
      />
    </>
  );
};

export default CustomFormManyToMany;
