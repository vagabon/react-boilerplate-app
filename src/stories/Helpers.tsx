import { withTests } from '@storybook/addon-jest';
import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IFormPropsDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { cloneElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppForm } from '../app/form/component/AppForm';
import { IYupValidators } from '../app/form/utils/AppFormUtils';
import results from '../jest-test-results.json';
import store from '../store/Store';

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
  children: React.JSX.Element;
}

export const FormWrapper = (props: IRadioWithFormProps) => {
  return (
    <AppForm initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={props.onSubmit}>
      {(formikProps: IFormPropsDto) => <>{cloneElement(props.children, formikProps)}</>}
    </AppForm>
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
