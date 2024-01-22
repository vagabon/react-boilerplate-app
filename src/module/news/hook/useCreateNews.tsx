import { ID, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { useRole } from '../../../hook/role/useRole';
import { IReducersActionsProps } from '../../../reducer/BaseReducer';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import { NewsReducerState } from '../reducer/NewsReducers';
import NewsService from '../service/NewsService';

export const useCreateNews = (endPoint: string, newsAction: IReducersActionsProps, idNews: number) => {
  const { navigate } = useAppRouter();
  const { userConnected } = useRole();
  const { data: news } = useAppSelector<NewsReducerState>((state) => state[endPoint]);
  const dispatch = useAppDispatch();

  const fetchById = useCallback(
    (id: ID) => {
      id &&
        NewsService.fetchById(endPoint, id).then((data) => {
          dispatch(newsAction.setData(data));
        });
    },
    [dispatch, endPoint, newsAction],
  );

  const createOrUpdateNews = useCallback(
    (news: INewsDto) => {
      if (!news.user) {
        news = { ...news, user: userConnected };
      }
      NewsService.createOrUpdate(
        endPoint,
        news,
      )(dispatch).then((data: INewsDto) => {
        dispatch(CommonAction.sliceHistory());
        navigate('/' + endPoint + '/update/' + data.id);
      });
    },
    [dispatch, endPoint, navigate, userConnected],
  );

  return { news: news?.[idNews] ?? {}, fetchById, createOrUpdateNews };
};
