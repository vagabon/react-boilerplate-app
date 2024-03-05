import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md';
import AppFormik from '../../../../app/formik/AppFormik';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';
import CustomModaleCard from './CustomModaleCard';

export interface ICustomModaleFormProps extends ICustomModaleChildProps {
  title: string;
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  small?: boolean;
  onSubmit?: (callback?: () => void) => (values: IApiDto) => void;
  children: ICustomModalChildrenType;
}

const CustomModaleForm: React.FC<ICustomModaleFormProps> = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...rest
}) => {
  return (
    <CustomModaleCard {...rest} title={title} className={'modal-form'}>
      {({ closeModal }) => (
        <AppFormik
          className='flex justify-center'
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit?.(closeModal)}
          onGoBack={closeModal}>
          {(props) => <>{children({ ...props, closeModal: closeModal })}</>}
        </AppFormik>
      )}
    </CustomModaleCard>
  );
};

export default CustomModaleForm;
