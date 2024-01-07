import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

import './i18n';

describe('i18n', () => {
  test('Given Trans from i18n When component is mount Then he is find in the DOM', () => {
    const { t } = useTranslation();
    expect(t).not.toBeNull();
  });
});
