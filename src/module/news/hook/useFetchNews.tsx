import { useCallback, useState } from 'react';
import { IReducersActionsProps } from '../../../reducer/BaseReducer';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INewsDto } from '../dto/NewsDto';
import NewsService from '../service/NewsService';

export const useFetchNews = (endPoint: string, newsAction: IReducersActionsProps) => {
  const { datas: news, search, page } = useAppSelector((state) => state[endPoint]);
  const dispatch = useAppDispatch();

  const [stopLoad, setStopLoad] = useState(false);

  const fetchNews = useCallback(
    (filter: INewsDto, page: number, max: number, orderBy: string, orderByAsc: string = 'asc') => {
      NewsService.fetchNews(endPoint, filter, page, max, orderBy, orderByAsc).then((data) => {
        if (data?.content?.length === 0 && page > 0) {
          setStopLoad(true);
        } else {
          dispatch(newsAction.setCount(data.totalElements));
          dispatch(page === 0 ? newsAction.setDatas(data?.content ?? []) : newsAction.addDatas(data?.content ?? []));
          setStopLoad(false);
        }
      });
    },
    [dispatch, endPoint, newsAction],
  );

  const doFetchDatas = useCallback(
    (filter: INewsDto, page: number) => {
      fetchNews(filter, page, 10, 'creationDate', 'desc');
    },
    [fetchNews],
  );

  const doSearch = useCallback(
    (search: string): void => {
      dispatch(newsAction.setSearchAndPage({ page: 0, search: search }));
      doFetchDatas({ search }, 0);
    },
    [dispatch, doFetchDatas, newsAction],
  );

  const doChangePage = useCallback(
    (page: number) =>
      (pageToAdd: number): void => {
        if (!stopLoad) {
          const newPage = page + pageToAdd;
          dispatch(newsAction.setPage(newPage));
          doFetchDatas({}, newPage);
        }
      },
    [dispatch, doFetchDatas, stopLoad, newsAction],
  );

  return { news, search, page, fetchNews, doSearch, doChangePage };
};
