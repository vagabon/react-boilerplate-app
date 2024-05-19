import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IThemeContextDto, useThemeContent } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import { useCallback, useState } from 'react';
import { IChartBarDto } from '../dto/ChartBarDto';

export const useAppChartBar = (title: string = 'Nombre de clicks') => {
  const [axis, setAxis] = useState<string[]>(['']);
  const [series, setSeries] = useState<IChartBarDto[]>([]);
  const { mode } = useThemeContent() as IThemeContextDto;

  const convertToChartBar = useCallback(
    (datas: IApiDto[], titleField: string, nbField: string, colors: string[] = ['#02b2af']) => {
      if (datas.length > 0) {
        const chartAxis: string[] = [];
        const chartSeries: number[] = [];
        datas.forEach((data) => {
          chartAxis.push(data[titleField as keyof IApiDto] as string);
          chartSeries.push(data[nbField as keyof IApiDto] as number);
        });
        setAxis(chartAxis);
        setSeries([{ label: title, data: chartSeries, color: colors?.[0] }]);
      }
    },
    [title],
  );

  const getColors = useCallback(
    (palette: JSONObject, isMember?: boolean) => {
      const primary =
        mode === 'dark' ? palette['primary-dark' as keyof JSONObject] : palette['primary' as keyof JSONObject];
      const secondary =
        mode === 'dark' ? palette['secondary-dark' as keyof JSONObject] : palette['secondary' as keyof JSONObject];
      return [isMember ? primary : secondary];
    },
    [mode],
  );

  return { axis, series, convertToChartBar, getColors };
};
