import {
  IApiDto,
  IFormPropsDto,
  JSONObject,
  MdButton,
  SetFieldValueType,
  UuidUtils,
  useAppRouter,
  useAppTranslate,
} from '@vagabond-inc/react-boilerplate-md';
import { Formik, FormikErrors } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { IPathDto } from '../../dto/path/PathDto';
import { useMessage } from '../../hook/message/useMessage';
import CustomModaleConfirm from '../../module/custom/modale/component/CustomModaleConfirm';
import { CommonAction } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';
import { IYupValidators, YupUtils } from '../../utils/yup/YupUtils';

export interface IAppFormikProps {
  className?: string;
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  onSubmit?: (values: IApiDto) => void;
  onGoBack?: () => void;
  children: (props: IFormPropsDto) => React.JSX.Element;
  backButton?: boolean;
  submitButton?: boolean;
  modalConfirm?: string;
}

const AppFormik: React.FC<IAppFormikProps> = memo(({ className = '', ...props }) => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const { history } = useAppSelector((state) => state.common);
  const { t } = useAppTranslate();
  const { message } = useMessage();

  const [state, setState] = useState<JSONObject>(props.initialValues);

  useEffect(() => {
    setState(props.initialValues);
  }, [props.initialValues]);

  const doSubmit = useCallback(
    (values: IApiDto, validateForm: (values?: IApiDto) => Promise<FormikErrors<IApiDto>>) => () => {
      dispatch(CommonAction.clearMessage());
      validateForm(values).then((errors: FormikErrors<IApiDto>) => {
        console.debug('form errors', values, errors);
        if (Object.keys(errors).length > 0) {
          dispatch(
            CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'COMMON:FORM.ERROR', type: 'error' }),
          );
        } else {
          dispatch(CommonAction.clearMessage());
          props.onSubmit?.(values);
        }
      });
    },
    [props, dispatch],
  );

  const onSubmit = useCallback(
    (values: IApiDto): void => {
      props.onSubmit?.(values);
    },
    [props],
  );

  const goBack = useCallback((): void => {
    if (props.onGoBack) {
      props.onGoBack();
    } else {
      const lastPage: IPathDto = history[history.length - 2];
      dispatch(CommonAction.sliceHistory());
      navigate(lastPage.link);
    }
  }, [dispatch, history, navigate, props]);

  return (
    <Formik
      initialValues={state}
      validationSchema={YupUtils.convertToYup(props.validationSchema, t)}
      onSubmit={onSubmit}
      autoComplete='off'
      enableReinitialize>
      {({ values, errors, touched, handleChange, handleBlur, validateForm, setFieldValue }) => (
        <>
          <div className={'form-content ' + className}>
            {props.children({
              values,
              state,
              errors,
              touched,
              validationSchema: props.validationSchema,
              handleChange,
              handleBlur,
              handleSubmit: (values: IApiDto) => doSubmit(values, validateForm)(),
              validateForm,
              setFieldValue: setFieldValue as SetFieldValueType,
              errorMessage: message?.message,
            })}
          </div>
          {(props.backButton || props.submitButton || props.modalConfirm) && (
            <>
              <div style={{ height: '30px' }}>&nbsp;</div>
              <div className='width100 flex-row justify-end'>
                {props.backButton && history.length > 1 && <MdButton label='Retour' variant='text' callback={goBack} />}
                {props.submitButton && props.onSubmit && (
                  <MdButton label='COMMON:SUBMIT' callback={doSubmit(values, validateForm)} />
                )}
                {props.modalConfirm && (
                  <CustomModaleConfirm
                    label={props.modalConfirm}
                    button='COMMON:SUBMIT'
                    callback={doSubmit(values, validateForm)}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
});

AppFormik.defaultProps = {
  backButton: true,
  submitButton: true,
};

export default AppFormik;
