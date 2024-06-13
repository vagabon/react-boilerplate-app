import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdInputDatepicker } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/datepicker/MdInputDatepicker';
import { MdFormFile } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/file/MdFormFile';
import { MdFormSwitch } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/switch/MdFormSwitch';
import { FormInputType, MdInputText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { MdInputTextSimple } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputTextSimple';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Fragment, memo, useCallback } from 'react';
import { AppForm } from '../../../../app/form/component/AppForm';
import { IYupValidators } from '../../../../app/form/utils/AppFormUtils';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import { useCustomFormUpload } from '../hook/useCustomFormUpload';
import { CustomFormManyToMany } from './CustomFormManyToMany';
import { CustomFormSelect } from './CustomFormSelect';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface ICustomFormProps {
  apiUrl: string;
  endPoint: string;
  conf: [string, IFormDto][];
  values: IApiDto;
  schema: IYupValidators;
  urlGoBack?: string;
  handleUpdate: (data: IApiDto) => void;
}

export const CustomForm: React.FC<ICustomFormProps> = memo(
  ({ apiUrl, endPoint, conf, values, schema, urlGoBack, handleUpdate }) => {
    const { navigate } = useAppRouter();
    const { handleChangeFile } = useCustomFormUpload(apiUrl, endPoint);

    const handleGoBack = useCallback(() => {
      urlGoBack && navigate?.(urlGoBack);
    }, [navigate, urlGoBack]);

    const getTextareaLength = useCallback((type: string) => {
      if (type === 'textarea5') {
        return 5;
      } else if (type === 'textarea') {
        return 10;
      }
      return undefined;
    }, []);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppForm
          className='flex-row custom-form form'
          initialValues={values}
          validationSchema={schema}
          onSubmit={handleUpdate}
          onGoBack={urlGoBack ? handleGoBack : undefined}>
          {(formikProps) => (
            <>
              {conf?.map(([key, form]: [string, IFormDto]) => (
                <Fragment key={key}>
                  {form.type === 'disable' && (
                    <div className={form.className ?? 'width100'}>
                      <MdInputTextSimple
                        label={form.label}
                        name={key}
                        type='text'
                        value={ObjectUtils.getRecursivValue(values, form?.value as string, false)}
                        disabled={true}
                      />
                    </div>
                  )}
                  {(form.type === 'text' ||
                    form.type === 'textarea5' ||
                    form.type === 'textarea' ||
                    form.type === 'date' ||
                    form.type === 'password') && (
                    <MdInputText
                      label={form.label}
                      className={form.className ?? 'width100'}
                      name={key}
                      textarea={getTextareaLength(form.type)}
                      {...formikProps}
                      type={form.type as FormInputType}
                    />
                  )}
                  {form.type === 'datetime' && (
                    <MdInputDatepicker
                      label={form.label}
                      className={form.className}
                      name={key}
                      {...formikProps}
                      disabled={form.disabled}
                    />
                  )}
                  {form.type === 'upload' && (
                    <>
                      <MdInputText
                        label={form.label}
                        className={form.className ?? 'width100'}
                        name={key}
                        {...formikProps}
                        type={form.type as FormInputType}
                      />
                      <MdFormFile
                        label={form.label}
                        name={key}
                        values={formikProps.values}
                        handleChangeFile={handleChangeFile(formikProps.handleChange)}
                      />
                    </>
                  )}
                  {form.type === 'select' && (
                    <CustomFormSelect
                      apiUrl={apiUrl}
                      conf={form}
                      label={form.label}
                      name={key}
                      listId={true}
                      {...formikProps}
                    />
                  )}
                  {form.type === 'm2m' && (
                    <CustomFormManyToMany apiUrl={apiUrl} conf={form} label={form.label} name={key} {...formikProps} />
                  )}
                  {form.type === 'switch' && (
                    <MdFormSwitch className={form.className} label={form.label} name={key} {...formikProps} />
                  )}
                  {form.type === 'image' && (
                    <img
                      src={apiUrl + '/file/download?filename=' + formikProps.values?.[form.label as keyof JSONObject]}
                      alt='DOWNLOAD'
                    />
                  )}
                </Fragment>
              ))}
            </>
          )}
        </AppForm>
      </LocalizationProvider>
    );
  },
);
