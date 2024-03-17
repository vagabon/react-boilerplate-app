// export md
export * from '@vagabond-inc/react-boilerplate-md';

export * from '@mui/x-charts';

// export i18n
export { default as i18n, type i18n as i18nType } from 'i18next';
export { default as LanguageDetector } from 'i18next-browser-languagedetector';
export { initReactI18next } from 'react-i18next';

// export router
export { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
export { StaticRouter } from 'react-router-dom/server';

// export store
export { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
export { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export { Action, Reducer, combineReducers } from 'redux';

// export lib
export { useApiService } from './api/hook/useApiService';
export { useApiServiceCrud } from './api/hook/useApiServiceCrud';
export { useApiServiceFetchBy } from './api/hook/useApiServiceFetchBy';
export { useApiServiceFindBy } from './api/hook/useApiServiceFindBy';
export { AxiosInterceptor } from './api/interceptor/AxiosInterceptor';
export { ApiService } from './api/service/ApiService';
export { ApiCrudService } from './api/service/crud/ApiCrudService';

export { default as AppButtonRefresh } from './app/button/component/refresh/AppButtonRefresh';
export type { IAppButtonRefreshProps } from './app/button/component/refresh/AppButtonRefresh';

export { default as AppChartBar } from './app/chart/bar/component/AppChartBar';
export type { IAppChartBarProps } from './app/chart/bar/component/AppChartBar';
export type { IChartBarDto } from './app/chart/bar/dto/ChartBarDto';
export { useAppChartBar } from './app/chart/bar/hook/useAppChartBar';

export { default as AppContent } from './app/content/AppContent';
export type { IAppContentProps } from './app/content/AppContent';
export { default as AppFabAdd } from './app/fab/add/AppFabAdd';
export type { IAppFabAddProps } from './app/fab/add/AppFabAdd';
export { default as AppFormik } from './app/formik/AppFormik';
export type { IAppFormikProps } from './app/formik/AppFormik';
export { default as AppInfiniteScrool } from './app/infinite-scroll/AppInfiniteScrool';
export type { IAppInfiniteScroolProps } from './app/infinite-scroll/AppInfiniteScrool';

export { default as AppInputWithButton } from './app/input-with-button/component/AppInputWithButton';
export type { IAppInputWithButtonProps } from './app/input-with-button/component/AppInputWithButton';

export type { IAuthUserDto, ICurrentUserDto } from './dto/current-user/CurrentUserDto';
export type { IMenuDto } from './dto/menu/MenuDto';
export type { IPageableDto } from './dto/pageable/PageableDto';
export type { IPathDto } from './dto/path/PathDto';
export { useClickOutside } from './hook/click/useClickOutside';
export { useHandleKey } from './hook/handle/useHandleKey';
export { useMessage } from './hook/message/useMessage';
export { useModal } from './hook/modal/useModal';
export type { IModalReturnProps } from './hook/modal/useModal';
export { default as HasRole } from './hook/role/HasRole';
export type { HasRoleProps } from './hook/role/HasRole';
export { useRole } from './hook/role/useRole';
export { useUserAuth } from './hook/user/useUserAuth';
export { default as AdminRouter } from './module/admin/AdminRouter';
export { default as AdminTable } from './module/admin/component/AdminTable';
export type { IAdminListPageProps } from './module/admin/component/AdminTable';
export type { IAdminTabConfDto, IAdminTabDto, IFormDto, IManyToManyDto } from './module/admin/dto/AdminConfDto';
export type {
  IAdminFilterDto,
  IAdminReducerDto,
  IAdminStateDto,
  IAdminTableDto,
} from './module/admin/dto/AdminReducerDto';
export { useAdminConf } from './module/admin/hook/useAdminConf';
export { useAdminList } from './module/admin/hook/useAdminList';
export { useAdminState } from './module/admin/hook/useAdminState';
export { default as AdminShowPage } from './module/admin/page/show/AdminShowPage';
export type { IAdminShowPageProps } from './module/admin/page/show/AdminShowPage';
export { default as AdminTabPage } from './module/admin/page/tab/AdminTabPage';
export { AdminAction, AdminReducer, AdminReducers, initialState } from './module/admin/reducer/AdminReducer';
export { default as AdminService } from './module/admin/service/AdminService';
export { default as AuthRouter } from './module/auth/AuthRouter';
export { default as AuthFooter } from './module/auth/component/auth.footer/AuthFooter';
export { useAuth } from './module/auth/hook/useAuth';
export { default as ActivationPage } from './module/auth/page/activation/ActivationPage';
export { default as CheckIdentityPage } from './module/auth/page/check-identity/CheckIdentityPage';
export type { ICheckIdentityDto } from './module/auth/page/check-identity/dto/CheckIdentityDto';
export { default as ForgetPasswordPage } from './module/auth/page/forget-password/ForgetPasswordPage';
export { default as LoginPage } from './module/auth/page/login/LoginPage';
export type { ILoginDto } from './module/auth/page/login/dto/LoginDto';
export { default as LoginFacebook } from './module/auth/page/login/facebook/LoginFacebook';
export { default as LoginGoogle } from './module/auth/page/login/google/LoginGoogle';
export { default as RegisterPage } from './module/auth/page/register/RegisterPage';
export type { IRegisterDto } from './module/auth/page/register/dto/RegisterDto';
export { AuthReducer, default as AuthReducers, LoginAction } from './module/auth/reducer/AuthReducers';
export type { AuthReducerState } from './module/auth/reducer/AuthReducers';
export { default as AuthService } from './module/auth/service/AuthService';

export { default as CustomForm } from './module/custom/form/component/CustomForm';
export type { ICustomFormProps } from './module/custom/form/component/CustomForm';
export { default as CustomFormManyToMany } from './module/custom/form/component/CustomFormManyToMany';
export type { ICustomFormManyToManyProps } from './module/custom/form/component/CustomFormManyToMany';
export { default as CustomFormModale } from './module/custom/form/component/CustomFormModale';
export { default as CustomFormSelect } from './module/custom/form/component/CustomFormSelect';
export type { ICustomFormSelectProps } from './module/custom/form/component/CustomFormSelect';
export { useCustomFormUpload } from './module/custom/form/hook/useCustomFormUpload';
export { default as CustomList } from './module/custom/list/component/CustomList';
export type { ICustomListDto, ICustomListProps } from './module/custom/list/component/CustomList';
export { default as CustomModale } from './module/custom/modale/component/CustomModale';
export type {
  ICustomModalChildrenType,
  ICustomModaleChildProps,
  ICustomModaleProps,
} from './module/custom/modale/component/CustomModale';
export { default as CustomModaleCard } from './module/custom/modale/component/CustomModaleCard';
export type { ICustomModaleCardProps } from './module/custom/modale/component/CustomModaleCard';
export { default as CustomModaleConfirm } from './module/custom/modale/component/CustomModaleConfirm';
export type { ICustomModaleConfirmProps } from './module/custom/modale/component/CustomModaleConfirm';
export { default as CustomModaleForm } from './module/custom/modale/component/CustomModaleForm';
export type { ICustomModaleFormProps } from './module/custom/modale/component/CustomModaleForm';
export { default as CustomSeo } from './module/custom/seo/component/CustomSeo';
export type { ICustomSeoProps } from './module/custom/seo/component/CustomSeo';
export { CustomSeoUtils } from './module/custom/seo/utils/CustomSeoUtils';
export { default as CustomShareButtons } from './module/custom/share/component/CustomShareButtons';
export type { ICustomShareButtonsProps } from './module/custom/share/component/CustomShareButtons';

export { default as CustomNotification } from './module/custom/notification/component/CustomNotification';
export type { ICustomNotificationProps } from './module/custom/notification/component/CustomNotification';

export { default as NewsRouter } from './module/news/NewsRouter';
export { default as NewsCard } from './module/news/component/card/NewsCard';
export type { INewsCardProps } from './module/news/component/card/NewsCard';
export { default as NewsCardSmall } from './module/news/component/card/NewsCardSmall';
export type { INewsCardSmallProps } from './module/news/component/card/NewsCardSmall';
export { default as NewsForm } from './module/news/component/form/NewsForm';
export { default as NewsList } from './module/news/component/list/NewsList';
export type { INewsDto } from './module/news/dto/NewsDto';
export { useCreateNews } from './module/news/hook/useCreateNews';
export { useFetchNews } from './module/news/hook/useFetchNews';
export { default as NewsListPage } from './module/news/page/list/NewsListPage';
export { default as NewsShowPage } from './module/news/page/show/NewsShowPage';
export { default as NewsUpdatePage } from './module/news/page/update/NewsUpdatePage';
export { NewsAction, NewsReducer, default as NewsReducers } from './module/news/reducer/NewsReducers';
export type { NewsReducerState } from './module/news/reducer/NewsReducers';
export { default as NewsService } from './module/news/service/NewsService';

export { default as NotificationRouter } from './module/notification/NotificationRouter';
export type { INotificationDto } from './module/notification/dto/NotificationDto';
export {
  NotificationAction,
  NotificationReducer,
  default as NotificationReducers,
} from './module/notification/reducer/NotificationReducer';

export { default as NotFoundPage } from './module/not-found/page/NotFoundPage';

export { default as UserRouter } from './module/user/UserRouter';
export { default as ProfileAvatar } from './module/user/profile/component/ProfileAvatar';
export type { IProfileAvatarProps } from './module/user/profile/component/ProfileAvatar';
export { default as ProfileShow } from './module/user/profile/component/ProfileShow';
export type { IProfileShowProps } from './module/user/profile/component/ProfileShow';
export { default as ProfileForm } from './module/user/profile/component/form/ProfileForm';
export type { IProfileFormProps } from './module/user/profile/component/form/ProfileForm';
export { default as ProfileFormEmail } from './module/user/profile/component/form/ProfileFormEmail';
export type { IProfileFormEmailProps } from './module/user/profile/component/form/ProfileFormEmail';
export { default as ProfileFormPassword } from './module/user/profile/component/form/ProfileFormPassword';
export type { IProfileFormPasswordProps } from './module/user/profile/component/form/ProfileFormPassword';
export type { IProfileDto } from './module/user/profile/dto/ProfileDto';
export { default as ProfilePage } from './module/user/profile/page/ProfilePage';
export { default as ProfileService } from './module/user/profile/service/ProfileService';
export type { IUserDto } from './module/user/user/dto/UserDto';
export { useUser } from './module/user/user/hook/useUser';
export { default as UserService } from './module/user/user/service/UserService';

export { default as CrudPage } from './page/CrudPage';
export type { CrudPageProps } from './page/CrudPage';
export { default as InfiniteScrollPage } from './page/InfiniteScrollPage';
export type { InfiniteScroolPageProps } from './page/InfiniteScrollPage';
export { default as ShowPage } from './page/ShowPage';
export type { ShowPageProps } from './page/ShowPage';

export { DefaultState, ReducersActions } from './reducer/BaseReducer';
export type { ActionReturn, IOrderState, ReducerCrudState } from './reducer/BaseReducer';
export { CommonAction, CommonReducer, default as CommonReducers } from './reducer/common/CommonReducer';
export type { IApiState as ApiState, MessageType } from './reducer/common/CommonReducer';

export type { AppDispatch, RootState } from './store/Store';

export { SuspenceLoader } from './suspence/SuspenceLoader';
export { default as AppTheme } from './template/AppTheme';
export type { IAppThemeProps, IConfDto } from './template/AppTheme';
export { default as Footer } from './template/Footer';
export type { IFoorterProps } from './template/Footer';
export { default as Header } from './template/Header';
export type { IHeaderProps } from './template/Header';
export { default as ShowMessage } from './template/message/ShowMessage';
export { default as RoleUtils } from './utils/role/RoleUtils';
export { StorageUtils } from './utils/storage/StorageUtils';
export { YupUtils } from './utils/yup/YupUtils';
export type { IYupValidator, IYupValidators } from './utils/yup/YupUtils';
