import { AppFormUtils } from './AppFormUtils';

describe('AppFormUtils - REQUIRED', () => {
  test('Given Json Datas When data is required and there is no Value Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        required: true,
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    const result = await tested.isValid({ test: '' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - email', () => {
  test('Given Json Datas When data is not email Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        email: true,
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    const result = await tested.isValid({ test: 'test' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - regexp', () => {
  test('Given Json Datas When data is not email Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        regexp: '\\d',
        regexpError: 'error on regexp',
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    const result = await tested.isValid({ test: 1 });
    expect(result).toBeTruthy();
  });
});

describe('AppFormUtils - min', () => {
  test('Given Json Datas When data length is short Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        min: 5,
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn().mockReturnValue(''));
    const result = await tested.isValid({ test: 'test' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - max', () => {
  test('Given Json Datas When data length is too long Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        max: 2,
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn().mockReturnValue(''));
    const result = await tested.isValid({ test: 'test' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - same', () => {
  test('Given Json Datas are not the same Then Yup Schema is not valid', async () => {
    const data = {
      test: {},
      test2: {
        same: 'test',
        sameLabel: 'test',
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn().mockReturnValue(''));
    const result = await tested.isValid({ test: 'test', test2: 'test2' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - same', () => {
  test('Given Json Datas are not the same Then Yup Schema is not valid', async () => {
    const data = {
      test: {},
      test2: {
        same: 'test',
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn().mockReturnValue(''));
    const result = await tested.isValid({ test: 'test', test2: 'test2' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - listId', () => {
  test('Given Json Datas are not the same Then Yup Schema is not valid', async () => {
    const data = {
      test: {
        listId: true,
        required: true,
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    const result = await tested.isValid({ test: '' });
    expect(result).toBeFalsy();
  });
});

describe('AppFormUtils - listId requiredWhen', () => {
  test('Given Json Datas are not the same Then Yup Schema is not valid', async () => {
    const data = {
      name: {
        listId: true,
        required: true,
      },
      test: {
        listId: true,
        required: true,
        requiredWhen: 'name',
        requiredWhenValue: ['1'],
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    let result = await tested.isValid({ test: '' });
    expect(result).toBeFalsy();
    result = await tested.isValid({ name: { id: '2' }, test: { id: '1' } });
    expect(result).toBeTruthy();
  });
});

describe('AppFormUtils - listId requiredWhen string', () => {
  test('Given Json Datas are not the same Then Yup Schema is not valid', async () => {
    const data = {
      name: {
        listId: true,
        required: true,
      },
      test: {
        required: true,
        requiredWhen: 'name',
        requiredWhenValue: ['1'],
      },
    };
    const tested = AppFormUtils.convertToYup(data, jest.fn());
    let result = await tested.isValid({ test: '' });
    expect(result).toBeFalsy();
    result = await tested.isValid({ name: { id: '2' }, test: 'test' });
    expect(result).toBeTruthy();
  });
});
