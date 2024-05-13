import { IApiDto, ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { ReactNode, memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/Store';

export interface ShowPageProps {
  data: IApiDto;
  fetchData: (id: ID) => void;
  children: ReactNode;
}

export const ShowPage: React.FC<ShowPageProps> = memo(({ ...rest }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const fetchData = useRef(rest.fetchData);

  useEffect(() => {
    id && fetchData.current(id);
  }, [dispatch, id]);

  return <>{rest.data && rest.children}</>;
});
