import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IFormPropsDto, SetFieldValueType } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Formik, FormikErrors } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { IPathDto } from '../../dto/path/PathDto';
import { useMessage } from '../../hook/message/useMessage';
import { CustomModaleConfirm } from '../../module/custom/modale/component/CustomModaleConfirm';
import { CommonAction } from '../../reducer/common/CommonReducers';
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

export const AppFormik: React.FC<IAppFormikProps> = memo(
  ({ className = '', backButton = true, submitButton = true, ...rest }) => {
    const dispatch = useAppDispatch();
    const { navigate } = useAppRouter();
    const history = useAppSelector((state) => state.common.history, shallowEqual);
    const { message } = useMessage();

    const [state, setState] = useState<JSONObject>(rest.initialValues);

    useEffect(() => {
      setState(rest.initialValues);
    }, [rest.initialValues]);

    const doSubmit = useCallback(
      (values: IApiDto, validateForm: (values?: IApiDto) => Promise<FormikErrors<IApiDto>>) => () => {
        dispatch(CommonAction.clearMessage());
        validateForm(values).then((errors: FormikErrors<IApiDto>) => {
          console.debug('form errors', values, errors);
          if (Object.keys(errors).length > 0) {
            console.error(errors);
            dispatch(
              CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'COMMON:FORM.ERROR', type: 'error' }),
            );
          } else {
            dispatch(CommonAction.clearMessage());
            rest.onSubmit?.(values);
          }
        });
      },
      [rest, dispatch],
    );

    const onSubmit = useCallback(
      (values: IApiDto): void => {
        rest.onSubmit?.(values);
      },
      [rest],
    );

    const goBack = useCallback((): void => {
      if (rest.onGoBack) {
        rest.onGoBack();
      } else {
        const lastPage: IPathDto = history[history.length - 2];
        dispatch(CommonAction.sliceHistory());
        navigate(lastPage.link);
      }
    }, [dispatch, history, navigate, rest]);

    return (
      <Formik
        initialValues={state}
        validationSchema={YupUtils.convertToYup(rest.validationSchema)}
        onSubmit={onSubmit}
        autoComplete='off'
        enableReinitialize>
        {({ values, errors, touched, handleChange, handleBlur, validateForm, setFieldValue }) => (
          <>
            <div className={'form-content ' + className}>
              {rest.children({
                values,
                errors,
                touched,
                validationSchema: rest.validationSchema,
                handleChange,
                handleBlur,
                handleSubmit: (values: IApiDto) => doSubmit(values, validateForm)(),
                validateForm,
                setFieldValue: setFieldValue as SetFieldValueType,
                errorMessage: message?.message,
              })}
            </div>
            {(backButton || submitButton || rest.modalConfirm) && (
              <>
                <div style={{ height: '20px' }}>&nbsp;</div>
                <div className='width100 flex-row justify-end'>
                  {backButton && history.length > 1 && <MdButton label='Retour' variant='text' callback={goBack} />}
                  {submitButton && rest.onSubmit && (
                    <MdButton label='COMMON:SUBMIT' callback={doSubmit(values, validateForm)} />
                  )}
                  {rest.modalConfirm && (
                    <CustomModaleConfirm
                      label={rest.modalConfirm}
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
  },
);
