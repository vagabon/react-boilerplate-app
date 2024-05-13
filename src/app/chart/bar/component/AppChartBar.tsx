import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdBouttonGroup } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/group/MdBouttonGroup';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { lazy, memo, useEffect } from 'react';
import { SuspenceLoader } from '../../../../suspence/SuspenceLoader';
import { useAppChartBar } from '../hook/useAppChartBar';

const BarChart = lazy(() => import('@mui/x-charts').then((module) => ({ default: module.BarChart })));

export interface IAppChartBarProps {
  id?: string;
  title?: string;
  charts: IApiDto[];
  colors?: string[];
  titleField?: string;
  nbField?: string;
  generateCallback?: () => void;
}

export const AppChartBar: React.FC<IAppChartBarProps> = memo(
  ({ id, title, charts, colors, titleField = 'day', nbField = 'nb', generateCallback }) => {
    const { axis, series, convertToChartBar } = useAppChartBar(title);

    useEffect(() => {
      if (charts.length > 0) {
        convertToChartBar(charts, String(titleField), String(nbField), colors);
      }
    }, [convertToChartBar, charts, titleField, nbField, colors]);

    return (
      <MdCard id={id}>
        <MdBouttonGroup className='button-right'>
          {generateCallback && <MdButton label='GENERATE' callback={generateCallback} />}
        </MdBouttonGroup>
        {SuspenceLoader(
          <BarChart
            xAxis={[{ data: axis, scaleType: 'band' }]}
            series={series}
            height={290}
            margin={{ bottom: 30, left: 40, right: 10 }}
          />,
        )}
      </MdCard>
    );
  },
);
