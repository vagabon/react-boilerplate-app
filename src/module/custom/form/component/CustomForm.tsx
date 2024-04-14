import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  FormInputType,
  IApiDto,
  MdFormFile,
  MdFormSwitch,
  MdInputDatepicker,
  MdInputText,
  useAppRouter,
} from '@vagabond-inc/react-boilerplate-md';
import { Fragment, memo, useCallback } from 'react';
import AppFormik from '../../../../app/formik/AppFormik';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import { useCustomFormUpload } from '../hook/useCustomFormUpload';
import CustomFormManyToMany from './CustomFormManyToMany';
import CustomFormSelect from './CustomFormSelect';

export interface ICustomFormProps {
  apiUrl: string;
  endPoint: string;
  conf: [string, IFormDto][];
  values: IApiDto;
  schema: IYupValidators;
  urlGoBack?: string;
  handleUpdate: (data: IApiDto) => void;
}

const CustomForm: React.FC<ICustomFormProps> = memo(
  ({ apiUrl, endPoint, conf, values, schema, urlGoBack, handleUpdate }) => {
    const { navigate } = useAppRouter();
    const { handleChangeFile } = useCustomFormUpload(apiUrl, endPoint);

    const handleGoBack = useCallback(() => {
      urlGoBack && navigate(urlGoBack);
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
        <AppFormik
          className='flex-row custom-form form'
          initialValues={values}
          validationSchema={schema}
          onSubmit={handleUpdate}
          onGoBack={urlGoBack ? handleGoBack : undefined}>
          {(props) => (
            <>
              {conf?.map(([key, form]: [string, IFormDto]) => (
                <Fragment key={key}>
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
                      {...props}
                      type={form.type as FormInputType}
                    />
                  )}
                  {form.type === 'datetime' && (
                    <MdInputDatepicker
                      label={form.label}
                      className={form.className}
                      name={key}
                      {...props}
                      disabled={form.disabled}
                    />
                  )}
                  {form.type === 'upload' && (
                    <>
                      <MdInputText
                        label={form.label}
                        className={form.className ?? 'width100'}
                        name={key}
                        {...props}
                        type={form.type as FormInputType}
                      />
                      <MdFormFile
                        label={form.label}
                        name={key}
                        values={props.values}
                        handleChangeFile={handleChangeFile(values.id, props.handleChange)}
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
                      {...props}
                    />
                  )}
                  {form.type === 'm2m' && (
                    <CustomFormManyToMany apiUrl={apiUrl} conf={form} label={form.label} name={key} {...props} />
                  )}
                  {form.type === 'switch' && (
                    <MdFormSwitch className={form.className} label={form.label} name={key} {...props} />
                  )}
                </Fragment>
              ))}
            </>
          )}
        </AppFormik>
      </LocalizationProvider>
    );
  },
);

export default CustomForm;
