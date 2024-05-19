import { IApiDto, ID, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IFormPropsDto, SetFieldValueType } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdChip } from '@vagabond-inc/react-boilerplate-md/dist/md/component/chip/MdChip';
import { MdFormError } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/MdFormError';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { useFormError } from '@vagabond-inc/react-boilerplate-md/dist/md/hook/useFormError';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMessage } from '../../../../hook/message/useMessage';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import { CustomFormModale } from './CustomFormModale';

export interface ICustomFormManyToManyProps extends IFormPropsDto {
  apiUrl: string;
  conf: IFormDto;
  label: string;
  name: string;
}

export const CustomFormManyToMany: React.FC<ICustomFormManyToManyProps> = memo(
  ({ conf, label, name, apiUrl, ...rest }) => {
    const { t } = useTranslation();
    const { message } = useMessage();
    const [open, setOpen] = useState(false);
    const [datas, setDatas] = useState<IApiDto[]>();
    const { error } = useFormError(name, rest.errors, rest.touched, message?.message);

    const validationSchema = rest.validationSchema?.[name as keyof JSONObject] ?? {};

    useEffect(() => {
      setDatas(rest.values?.[name as keyof JSONObject] ?? []);
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
      (id: ID, oldDatas: IApiDto[], callback?: SetFieldValueType) => () => {
        if (id && oldDatas) {
          const newDatas = oldDatas.filter((oneData: IApiDto) => oneData.id !== id);
          setDatas(newDatas);
          callback?.(name, newDatas);
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
              {t(label)}
              {validationSchema?.['required' as keyof JSONObject] ? ' *' : ''}
            </MdTypo>
            <div>
              {datas?.map((data: IApiDto) => (
                <MdChip
                  className='text-error'
                  key={data.id}
                  label={(data?.[conf.m2m?.name as keyof IApiDto] as string) ?? ''}
                  icon='delete'
                  callbackDelete={handleDelete(data.id, datas, rest.setFieldValue)}
                />
              ))}
              <MdButton callback={handleModalOpen} icon='add' />
            </div>
          </div>

          <MdFormError error={error} />
        </div>
        <CustomFormModale
          apiUrl={apiUrl}
          conf={conf.m2m}
          open={open}
          handleClose={handleModalClose}
          handleSelect={handleSelectData(datas, rest.setFieldValue)}
        />
      </>
    );
  },
);
