import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { useTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useTranslate';
import { lazy, memo, useEffect, useState } from 'react';
import { ICustomListDto } from '../../../../module/custom/list/component/CustomList';
import { AppSuspenceLoader } from '../../../suspence/component/AppSuspenceLoader';

const PieChart = lazy(() => import('@mui/x-charts').then((module) => ({ default: module.PieChart })));

export interface IAppChartPieProps {
  custumList: ICustomListDto[];
  height?: number;
}

export const AppChartPie: React.FC<IAppChartPieProps> = memo(({ custumList, height }) => {
  const { translate } = useTranslate();

  const [series, setSeries] = useState<{ id: number; value: number; label: string }[]>(
    custumList.map((item) => {
      return { id: item.entity.id as number, value: parseInt(item.chip?.toString() ?? '0'), label: item.name };
    }),
  );

  useEffect(() => {
    custumList.length > 0 &&
      setSeries(
        custumList.map((item) => {
          return {
            id: item.entity.id as number,
            value: parseInt(item.chip?.toString() ?? '0'),
            label: item.name?.length > 12 ? item.name.substring(0, 12) + '..' : item.name,
          };
        }),
      );
    custumList.length === 0 && setSeries([{ id: 0, value: 0, label: translate('NO_CLICK') }]);
  }, [translate, custumList]);

  return (
    <MdCard>
      <AppSuspenceLoader>
        <PieChart
          series={[
            {
              data: series,
            },
          ]}
          height={height ?? 320}
        />
      </AppSuspenceLoader>
    </MdCard>
  );
});
