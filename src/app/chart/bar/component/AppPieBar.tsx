import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { I18nUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/i18n/I18nUtils';
import { lazy, memo, useEffect, useState } from 'react';
import { ICustomListDto } from '../../../../module/custom/list/component/CustomList';
import { SuspenceLoader } from '../../../../suspence/SuspenceLoader';

const PieChart = lazy(() => import('@mui/x-charts').then((module) => ({ default: module.PieChart })));

export interface IAppPieBarProps {
  custumList: ICustomListDto[];
  height?: number;
}

export const AppPieBar: React.FC<IAppPieBarProps> = memo(({ custumList, height }) => {
  const { t } = useAppTranslate();
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
    custumList.length === 0 && setSeries([{ id: 0, value: 0, label: I18nUtils.translate(t, 'NO_CLICK') }]);
  }, [custumList, t]);

  return (
    <MdCard>
      {SuspenceLoader(
        <PieChart
          series={[
            {
              data: series,
            },
          ]}
          height={height ?? 320}
        />,
      )}
    </MdCard>
  );
});
