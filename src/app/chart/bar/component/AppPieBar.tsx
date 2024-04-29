import { PieChart } from '@mui/x-charts';
import { I18nUtils, MdCard, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect, useState } from 'react';
import { ICustomListDto } from '../../../../module/custom/list/component/CustomList';

export interface IAppPieBarProps {
  custumList: ICustomListDto[];
  height?: number;
}

const AppPieBar: React.FC<IAppPieBarProps> = memo(({ custumList, height }) => {
  const { t } = useAppTranslate();
  const [series, setSeries] = useState<{ id: number; value: number; label: string }[]>(
    custumList.map((item) => {
      return { id: item.entity.id as number, value: parseInt(item.chip ?? '0'), label: item.name };
    }),
  );

  useEffect(() => {
    custumList.length > 0 &&
      setSeries(
        custumList.map((item) => {
          return {
            id: item.entity.id as number,
            value: parseInt(item.chip ?? '0'),
            label: item.name?.length > 12 ? item.name.substring(0, 12) + '..' : item.name,
          };
        }),
      );
    custumList.length === 0 && setSeries([{ id: 0, value: 0, label: I18nUtils.translate(t, 'NO_CLICK') }]);
  }, [custumList, t]);

  return (
    <MdCard>
      <PieChart
        series={[
          {
            data: series,
          },
        ]}
        height={height ?? 320}
      />
    </MdCard>
  );
});

export default AppPieBar;
