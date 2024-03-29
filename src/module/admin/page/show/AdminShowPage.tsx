import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IApiDto, JSONObject, MdCard, useAppRouter, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { useAppDispatch } from '../../../../store/Store';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import CustomForm from '../../../custom/form/component/CustomForm';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { IAdminTabConfDto, IAdminTabDto } from '../../dto/AdminConfDto';
import { useAdminConf } from '../../hook/useAdminConf';
import { useAdminState } from '../../hook/useAdminState';
import { AdminAction } from '../../reducer/AdminReducer';
import AdminService from '../../service/AdminService';

export interface IAdminShowPageProps extends IBaseCustomSeoProps {
  conf: IAdminTabConfDto;
}

const AdminShowPage: React.FC<IAdminShowPageProps> = ({ conf, ...rest }) => {
  const { t } = useAppTranslate();
  const dispatch = useAppDispatch();
  const {
    params: { page = '', id = '-1' },
  } = useAppRouter();
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
  }, [id, t, pageConf]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContent {...rest} seoTitle='SEO:ADMIN.TITLE' seoDescription='SEO:ADMIN.DESCRIPTION'>
        <HasRole roles={['ADMIN']}>
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
        </HasRole>
      </AppContent>
    </LocalizationProvider>
  );
};

export default AdminShowPage;
