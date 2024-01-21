import { ID } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { IReducersActionsProps } from '../../../reducer/BaseReducer';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import { NewsReducerState } from '../reducer/NewsReducers';
import NewsService from '../service/NewsService';

export const useCreateNews = (endPoint: string, newsAction: IReducersActionsProps, idNews: number) => {
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
      NewsService.createOrUpdate(endPoint, news)(dispatch);
    },
    [dispatch, endPoint],
  );

  return { news: news?.[idNews] ?? {}, fetchById, createOrUpdateNews };
};
