import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../../../app/content/component/AppContent';
import { IYupValidators } from '../../../../app/form/utils/AppFormUtils';
import { useAppDispatch } from '../../../../store/Store';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { CustomForm } from '../../../custom/form/component/CustomForm';
import { ProfileRole } from '../../../user/profile/component/role/ProfileRole';
import { IAdminTabConfDto, IAdminTabDto } from '../../dto/AdminConfDto';
import { useAdminConf } from '../../hook/useAdminConf';
import { useAdminState } from '../../hook/useAdminState';
import { AdminAction } from '../../reducer/AdminReducers';
import { AdminService } from '../../service/AdminService';

export interface IAdminShowPageProps extends IHeaderDto {
  conf: IAdminTabConfDto;
}

export const AdminShowPage: React.FC<IAdminShowPageProps> = memo(({ conf, ...rest }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { page = '', id = '-1' } = useParams();
  const { pageConf, formConf } = useAdminConf(page, conf);

  const { state } = useAdminState(page, pageConf as IAdminTabDto);

  useEffect(() => {
    if (id !== '-1' && pageConf?.name === page) {
      AdminService.findById<IApiDto>(rest.apiUrl, page, id).then((data) => {
        let newData = data;
        formConf.forEach(([key, form]) => {
          const value = newData[key as keyof JSONObject];
          if (!form.array && !form.listId && (!value || value === null)) {
            newData = { ...newData, [key as keyof JSONObject]: '' };
          }
        });
        dispatch(AdminAction.setData({ activePage: page, data: newData }));
      });
    } else {
      const data: IApiDto = { id: '' };
      dispatch(AdminAction.setData({ activePage: page, data }));
    }
  }, [rest.apiUrl, dispatch, page, id, pageConf, formConf]);

  const handleUpdate = useCallback(
    (data: IApiDto) => {
      if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
        AdminService.update(rest.apiUrl, page, data)(dispatch);
      } else {
        AdminService.create(
          rest.apiUrl,
          page,
          data,
        )(dispatch).then((dataNew: IApiDto) => {
          data.id = dataNew.id;
          dispatch(AdminAction.setData({ activePage: page, data: data }));
        });
      }
    },
    [rest.apiUrl, dispatch, page],
  );

  const getTitle = useCallback(() => {
    let title = t('COMMON:FORM:CREATE');
    if (id !== '-1') {
      title = t('COMMON:FORM:UPDATE');
    }
    if (pageConf) {
      title += t(pageConf.label);
    }
    return title;
  }, [t, id, pageConf]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContent {...rest} seo='SEO:ADMIN'>
        <ProfileRole roles={['ADMIN']}>
          <MdCard title={getTitle()}>
            {state && (
              <CustomForm
                {...rest}
                endPoint={page}
                urlGoBack={'/admin/tab/' + page}
                conf={formConf}
                values={state.data}
                schema={pageConf?.form as IYupValidators}
                handleUpdate={handleUpdate}
              />
            )}
          </MdCard>
        </ProfileRole>
      </AppContent>
    </LocalizationProvider>
  );
});
