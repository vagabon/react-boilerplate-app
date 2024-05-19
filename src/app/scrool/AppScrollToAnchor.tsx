import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { useAppDispatch } from '../../store/Store';
import { useAppScroll } from '../../template/hook/useAppScroll';

export const AppScrollToAnchor = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const lastHash = useRef('');
  const { getScrollPage } = useAppScroll();

  useEffect(() => {
    dispatch(CommonAction.clearMessage());
    !location.pathname.includes('#') &&
      dispatch(CommonAction.addHistory({ id: '', title: '', link: location.pathname }));
  }, [location, dispatch]);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location?.pathname, location?.search]);

  useEffect(() => {
    getScrollPage(location.pathname);
  }, [getScrollPage, location.pathname]);

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document.getElementById(lastHash.current)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);

  return null;
};
