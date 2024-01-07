import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import { NewsAction } from '../reducer/NewsReducers';
import NewsService from '../service/NewsService';

export const useFetchNews = (): {
  news: INewsDto[];
  search: string;
  page: number;
  fetchNews: (filter: INewsDto, page: number, max: number, orderBy: string, orderByAsc: string) => void;
  doSearch: (search: string) => void;
  doChangePage: (page: number) => (pageToAdd: number) => void;
} => {
  const { datas: news, search, page } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const [stopLoad, setStopLoad] = useState(false);

  const fetchNews = useCallback(
    (filter: INewsDto, page: number, max: number, orderBy: string, orderByAsc: string = 'asc') => {
      NewsService.fetchNews(filter, page, max, orderBy, orderByAsc).then((data) => {
        if (data.content.length === 0 && page > 0) {
          setStopLoad(true);
        } else {
          dispatch(NewsAction.setCount(data.totalElements));
          dispatch(page === 0 ? NewsAction.setDatas(data.content) : NewsAction.addDatas(data.content));
          setStopLoad(false);
        }
      });
    },
    [dispatch],
  );

  const doFetchDatas = useCallback(
    (filter: INewsDto, page: number) => {
      fetchNews(filter, page, 10, 'creationDate', 'desc');
    },
    [fetchNews],
  );

  const doSearch = useCallback(
    (search: string): void => {
      dispatch(NewsAction.setSearchAndPage({ page: 0, search: search }));
      doFetchDatas({ search }, 0);
    },
    [dispatch, doFetchDatas],
  );

  const doChangePage = useCallback(
    (page: number) =>
      (pageToAdd: number): void => {
        if (!stopLoad) {
          const newPage = page + pageToAdd;
          dispatch(NewsAction.setPage(newPage));
          doFetchDatas({}, newPage);
        }
      },
    [dispatch, doFetchDatas, stopLoad],
  );

  return { news, search, page, fetchNews, doSearch, doChangePage };
};
