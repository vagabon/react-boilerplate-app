import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { useTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useTranslate';
import { lazy, memo, useMemo } from 'react';
import { ICustomListDto } from '../../../../module/custom/list/component/CustomList';
import { AppSuspenceLoader } from '../../../suspence/component/AppSuspenceLoader';

const PieChart = lazy(() => import('@mui/x-charts').then((module) => ({ default: module.PieChart })));

export interface IAppChartPieProps {
  custumList: ICustomListDto[];
  height?: number;
  mainColor: string;
}

export const AppChartPie: React.FC<IAppChartPieProps> = memo(({ custumList, height, mainColor }) => {
  const { translate } = useTranslate();

  const calculateBrightestColor = (hex: string, lightest: number) => {
    let usePound = false;
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
      usePound = true;
    }
    const num = parseInt(hex, 16);
    let r = (num >> 16) + lightest;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + lightest;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + lightest;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  };

  const series = useMemo(() => {
    return (
      custumList?.map((item) => {
        return {
          id: item.entity.id as number,
          value: parseInt(item.chip?.toString() ?? '0'),
          label: item.name?.length > 12 ? item.name.substring(0, 12) + '..' : item.name,
        };
      }) ?? [{ id: 0, value: 0, label: translate('NO_CLICK') }]
    );
  }, [translate, custumList]);

  const colors = useMemo((): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < series.length + 1; i++) {
      colors.push(calculateBrightestColor(mainColor, 10 * (i + 1)));
    }
    // put the mainColor into the first element which is always black
    colors[0] = mainColor;
    return colors;
  }, [mainColor, series.length]);

  return (
    <MdCard>
      <AppSuspenceLoader>
        <PieChart
          colors={colors}
          series={[
            {
              data: series,
              innerRadius: 5,
              outerRadius: 125,
              paddingAngle: 0,
              cornerRadius: 0,
            },
          ]}
          height={height ?? 320}
        />
      </AppSuspenceLoader>
    </MdCard>
  );
});
