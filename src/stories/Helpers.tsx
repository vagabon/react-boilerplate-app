import { withTests } from '@storybook/addon-jest';
import { cloneElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/Store';
import { IYupValidators } from '../utils/yup/YupUtils';

import { IApiDto, IFormPropsDto, JSONObject } from '@vagabond-inc/react-boilerplate-md';
import AppFormik from '../app/formik/AppFormik';

import results from '../jest-test-results.json';

export const withProvider = (Story: React.FC) => (
  <Provider store={store}>
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  </Provider>
);

interface IRadioWithFormProps {
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  onSubmit: () => void;
  children: JSX.Element;
}

export const FormWrapper = (props: IRadioWithFormProps) => {
  return (
    <AppFormik initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={props.onSubmit}>
      {(formikProps: IFormPropsDto) => <>{cloneElement(props.children, formikProps)}</>}
    </AppFormik>
  );
};

interface IOptions extends IApiDto {
  label: string;
}
export const optionsYesNo: IOptions[] = [
  { id: 'OUI', label: 'OUI' },
  { id: 'NON', label: 'NON' },
];

export const withTest = withTests({ results });
