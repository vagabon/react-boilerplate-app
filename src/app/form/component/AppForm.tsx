import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IFormPropsDto, SetFieldValueType } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Formik, FormikErrors } from 'formik';
import React, { memo, useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { CustomModaleConfirm } from '../../../module/custom/modale/component/CustomModaleConfirm';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { CommonAction } from '../../../store/reducer/common/CommonReducers';
import { ButtonGoBack } from '../../button/component/go-back/ButtonGoBack';
import { AppFormUtils, IYupValidators } from '../utils/AppFormUtils';

export interface IAppFormProps {
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

export const AppForm: React.FC<IAppFormProps> = memo(
  ({ className = '', backButton = true, submitButton = true, ...rest }) => {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.common.message.message, shallowEqual);
    const state = useMemo(() => rest.initialValues, [rest.initialValues]);

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

    return (
      <Formik
        initialValues={state}
        validationSchema={AppFormUtils.convertToYup(rest.validationSchema)}
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
                errorMessage: message,
              })}
            </div>
            {(backButton || submitButton || rest.modalConfirm) && (
              <>
                <div className='height-20'>&nbsp;</div>
                <div className='width100 flex-row justify-end'>
                  {backButton && <ButtonGoBack onGoBack={rest.onGoBack} />}
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
