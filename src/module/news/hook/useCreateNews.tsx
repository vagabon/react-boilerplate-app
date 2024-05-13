import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { useRole } from '../../../hook/role/useRole';
import { IReducersActionsProps } from '../../../reducer/BaseReducer';
import { CommonAction } from '../../../reducer/common/CommonReducers';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import { NewsReducerState } from '../reducer/NewsReducers';
import { NewsService } from '../service/NewsService';

export const useCreateNews = (apiUrl: string, endPoint: string, newsAction: IReducersActionsProps, idNews: number) => {
  const { navigate } = useAppRouter();
  const { userConnected } = useRole();
  const { data: news } = useAppSelector<NewsReducerState>((state) => state[endPoint]);
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
        navigate('/' + endPoint + '/update/' + data.id);
      });
    },
    [apiUrl, dispatch, endPoint, navigate, userConnected],
  );

  return { news: news?.[idNews] ?? {}, fetchById, createOrUpdateNews };
};
