import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';
import { IChartBarDto } from '../dto/ChartBarDto';

export const useAppChartBar = (title: string = 'Nombre de clicks') => {
  const [axis, setAxis] = useState<string[]>(['']);
  const [series, setSeries] = useState<IChartBarDto[]>([]);

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

  return { axis, series, convertToChartBar };
};
