import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { IReducersActionsProps } from '../../../store/reducer/BaseReducer';
import { CommonAction } from '../../../store/reducer/common/CommonReducers';
import { useProfile } from '../../user/profile/hook/useProfile';
import { INewsDto } from '../dto/NewsDto';
import { NewsReducerState } from '../reducer/NewsReducers';
import { NewsService } from '../service/NewsService';

export const useCreateNews = (apiUrl: string, endPoint: string, newsAction: IReducersActionsProps, idNews: number) => {
  const { navigate } = useAppRouter();
  const { userConnected } = useProfile();
  const { data: news } = useAppSelector<NewsReducerState>((state) => state[endPoint], shallowEqual);
  const dispatch = useAppDispatch();

  const fetchById = useCallback(
    (id: ID) => {
      id &&
        NewsService.fetchById(apiUrl, endPoint, id).then((data) => {
          dispatch(newsAction.setData(data));
        });
    },
    [apiUrl, dispatch, endPoint, newsAction],
  );

  const createOrUpdateNews = useCallback(
    (news: INewsDto) => {
      if (!news.user) {
        news = { ...news, user: userConnected };
      }
      NewsService.createOrUpdate(apiUrl, endPoint, news, dispatch).then((data: INewsDto) => {
        if (!news.id) {
          dispatch(CommonAction.sliceHistoryOnce());
        }
        navigate?.('/' + endPoint + '/update/' + data.id);
      });
    },
    [apiUrl, dispatch, endPoint, navigate, userConnected],
  );

  return { news: news?.[idNews] ?? {}, fetchById, createOrUpdateNews };
};
