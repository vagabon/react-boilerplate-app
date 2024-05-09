import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import AppFormik from '../../../../app/formik/AppFormik';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';
import CustomModaleCard from './CustomModaleCard';

export interface ICustomModaleFormProps extends ICustomModaleChildProps {
  icon?: string;
  title: string;
  initialValues?: JSONObject;
  validationSchema?: IYupValidators;
  small?: boolean;
  onSubmit?: (callback?: () => void) => (values: IApiDto) => void;
  children: ICustomModalChildrenType;
}

const CustomModaleForm: React.FC<ICustomModaleFormProps> = memo(
  ({ icon, title, initialValues = {}, validationSchema = {}, onSubmit, children, ...rest }) => {
    return (
      <CustomModaleCard {...rest} icon={icon} title={title} className={'modal-form'}>
        {({ closeModal }) => (
          <AppFormik
            className='flex justify-center'
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit?.(closeModal)}
            onGoBack={closeModal}>
            {(formikProps) => <>{children({ ...formikProps, closeModal: closeModal })}</>}
          </AppFormik>
        )}
      </CustomModaleCard>
    );
  },
);

export default CustomModaleForm;
