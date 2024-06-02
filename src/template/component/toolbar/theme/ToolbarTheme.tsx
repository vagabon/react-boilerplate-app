import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { useThemeContent } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import { memo } from 'react';

export const ToolbarTheme: React.FC = memo(() => {
  const themeContext = useThemeContent();

  return (
    <IconClickable
      color='inherit'
      icon={themeContext?.mode === 'dark' ? 'sun' : 'moon'}
      callback={themeContext?.switchTheme(themeContext?.mode)}
    />
  );
});
