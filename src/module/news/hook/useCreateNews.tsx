import { ID } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import { NewsAction } from '../reducer/NewsReducers';
import NewsService from '../service/NewsService';

export const useCreateNews = (): {
  news: INewsDto;
  createOrUpdateNews: (news: INewsDto) => void;
  fetchById: (id: ID) => void;
} => {
  const { data: news } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const fetchById = useCallback(
    (id: ID) => {
      id &&
        NewsService.fetchById(id).then((data) => {
          dispatch(NewsAction.setData(data));
        });
      !id && dispatch(NewsAction.setData({}));
    },
    [dispatch],
  );

  const createOrUpdateNews = useCallback(
    (news: INewsDto) => {
      NewsService.createOrUpdate(news)(dispatch);
    },
    [dispatch],
  );

  return { news, fetchById, createOrUpdateNews };
};
