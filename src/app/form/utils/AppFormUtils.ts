import { t } from 'i18next';
import * as Yup from 'yup';

export interface IYupValidator {
  type?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  regexp?: string;
  regexpError?: string;
  email?: boolean;
  min?: number;
  max?: number;
  same?: string;
  sameLabel?: string;
  listId?: boolean;
  array?: boolean;
}

export interface IYupValidators {
  [x: string]: IYupValidator;
}

type IYupShape = { [x: string]: Yup.StringSchema | Yup.AnySchema };

export const AppFormUtils = {
  convertToYup: (datas: IYupValidators): Yup.Schema => {
    let shape: IYupShape = {};

    Object.entries(datas).forEach(([key, value]: [string, IYupValidator]) => {
      if (value.listId) {
        shape = AppFormUtils.getObjectSchema(shape, value, key);
      } else if (value.array) {
        shape = AppFormUtils.getArraySchema(shape, value, key);
      } else {
        shape = AppFormUtils.getStringSchema(shape, value, key);
      }
    });
    return Yup.object().shape(shape);
  },
  getObjectSchema(shape: IYupShape, value: IYupValidator, key: string): IYupShape {
    if (value.required) {
      shape = {
        ...shape,
        [key]: AppFormUtils.getObjectSchemaRequired(),
      };
    }
    return shape;
  },
  getArraySchema(shape: IYupShape, value: IYupValidator, key: string): IYupShape {
    if (value.required) {
      shape = {
        ...shape,
        [key]: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(t('ERRORS:REQUIRED')),
            }),
          )
          .defined(t('ERRORS:REQUIRED'))
          .test('required', t('ERRORS:REQUIRED'), (value) => value && value.length > 0),
      };
    }
    return shape;
  },
  getObjectSchemaRequired(): Yup.Schema {
    return Yup.object().required(t('ERRORS:REQUIRED'));
  },
  getStringSchema(shape: IYupShape, value: IYupValidator, key: string): IYupShape {
    shape = {
      ...shape,
      [key]: AppFormUtils.getStringSchemaYup(value),
    };
    return shape;
  },
  getStringSchemaYup(value: IYupValidator): Yup.Schema {
    let yup: Yup.StringSchema = Yup.string();

    if (value.required === true) {
      yup = yup.required(t('ERRORS:REQUIRED'));
    }
    if (value.min) {
      yup = yup.min(value.min, t('ERRORS:MIN').replace('$1', value.min.toString()));
    }
    if (value.max) {
      yup = yup.max(value.max, t('ERRORS:MAX').replace('$1', value.max.toString()));
    }
    if (value.same) {
      const translate: string = value.sameLabel ? t(value.sameLabel) : t('ERRORS:SAME');
      yup = yup.oneOf([Yup.ref(value.same)], translate);
    }
    if (value.email) {
      yup = yup.email(t('ERRORS:FORMAT_MAIL'));
    }
    if (value.regexp) {
      yup = yup.trim().matches(new RegExp(value.regexp), t(value.regexpError ? value.regexpError : 'ERRORS:REGEXP'));
    }
    return yup.nullable();
  },
};
