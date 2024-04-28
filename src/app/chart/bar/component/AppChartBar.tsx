import { BarChart, cheerfulFiestaPaletteDark } from '@mui/x-charts';
import { IApiDto, MdBouttonGroup, MdButton, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import { useAppChartBar } from '../hook/useAppChartBar';

export interface IAppChartBarProps {
  id?: string;
  title?: string;
  charts: IApiDto[];
  colors?: string[];
  titleField?: string;
  nbField?: string;
  generateCallback?: () => void;
}

const AppChartBar: React.FC<IAppChartBarProps> = memo(
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
        <BarChart
          colors={cheerfulFiestaPaletteDark}
          xAxis={[{ data: axis, scaleType: 'band' }]}
          series={series}
          height={290}
          margin={{ bottom: 30, left: 40, right: 10 }}
        />
      </MdCard>
    );
  },
);

export default AppChartBar;
