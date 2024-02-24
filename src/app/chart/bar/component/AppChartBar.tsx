import { BarChart } from '@mui/x-charts';
import { IApiDto, MdBouttonGroup, MdButton, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import { useAppChartBar } from '../hook/useAppChartBar';

export interface IAppChartBarProps {
  charts: IApiDto[];
  generateCallback?: () => void;
}

const AppChartBar: React.FC<IAppChartBarProps> = ({ charts, generateCallback }) => {
  const { axis, series, convertToChartBar } = useAppChartBar();

  useEffect(() => {
    if (charts.length > 0) {
      convertToChartBar(charts, 'day', 'nb');
    }
  }, [convertToChartBar, charts]);

  return (
    <MdCard>
      <MdBouttonGroup className='button-right'>
        {generateCallback && <MdButton label='GENERATE' callback={generateCallback} />}
      </MdBouttonGroup>
      <BarChart
        xAxis={[{ data: axis, scaleType: 'band' }]}
        series={series}
        height={290}
        margin={{ bottom: 30, left: 40, right: 10 }}
      />
    </MdCard>
  );
};

export default AppChartBar;
