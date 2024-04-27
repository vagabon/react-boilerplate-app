import { I18nTranslate, I18nUtils } from '@vagabond-inc/react-boilerplate-md';
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

export const YupUtils = {
  convertToYup: (datas: IYupValidators, t: I18nTranslate): Yup.Schema => {
    let shape: IYupShape = {};

    Object.entries(datas).forEach(([key, value]: [string, IYupValidator]) => {
      if (value.listId) {
        shape = YupUtils.getObjectSchema(shape, value, key, t);
      } else if (value.array) {
        shape = YupUtils.getArraySchema(shape, value, key, t);
      } else {
        shape = YupUtils.getStringSchema(shape, value, key, t);
      }
    });
    return Yup.object().shape(shape);
  },
  getObjectSchema(shape: IYupShape, value: IYupValidator, key: string, t: I18nTranslate): IYupShape {
    if (value.required) {
      shape = {
        ...shape,
        [key]: YupUtils.getObjectSchemaRequired(t),
      };
    }
    return shape;
  },
  getArraySchema(shape: IYupShape, value: IYupValidator, key: string, t: I18nTranslate): IYupShape {
    if (value.required) {
      shape = {
        ...shape,
        [key]: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(I18nUtils.translate(t, 'ERRORS:REQUIRED')),
            }),
          )
          .defined(I18nUtils.translate(t, 'ERRORS:REQUIRED'))
          .test('required', I18nUtils.translate(t, 'ERRORS:REQUIRED'), (value) => value && value.length > 0),
      };
    }
    return shape;
  },
  getObjectSchemaRequired(t: I18nTranslate): Yup.Schema {
    return Yup.object().required(I18nUtils.translate(t, 'ERRORS:REQUIRED'));
  },
  getStringSchema(shape: IYupShape, value: IYupValidator, key: string, t: I18nTranslate): IYupShape {
    shape = {
      ...shape,
      [key]: YupUtils.getStringSchemaYup(value, t),
    };
    return shape;
  },
  getStringSchemaYup(value: IYupValidator, t: I18nTranslate): Yup.Schema {
    let yup: Yup.StringSchema = Yup.string();

    if (value.required === true) {
      yup = yup.required(I18nUtils.translate(t, 'ERRORS:REQUIRED'));
    }
    if (value.min) {
      yup = yup.min(value.min, t('ERRORS:MIN').replace('$1', value.min.toString()));
    }
    if (value.max) {
      yup = yup.max(value.max, t('ERRORS:MAX').replace('$1', value.max.toString()));
    }
    if (value.same) {
      const translate: string = value.sameLabel
        ? I18nUtils.translate(t, value.sameLabel)
        : I18nUtils.translate(t, 'ERRORS:SAME');
      yup = yup.oneOf([Yup.ref(value.same)], translate);
    }
    if (value.email) {
      yup = yup.email(I18nUtils.translate(t, 'ERRORS:FORMAT_MAIL'));
    }
    if (value.regexp) {
      yup = yup
        .trim()
        .matches(
          new RegExp(value.regexp),
          I18nUtils.translate(t, value.regexpError ? value.regexpError : 'ERRORS:REGEXP'),
        );
    }
    return yup.nullable();
  },
};
