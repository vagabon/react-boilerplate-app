import { useEffect, useState } from 'react';
import { IAdminTabConfDto, IAdminTabDto, IFormDto } from '../dto/AdminConfDto';

export const useAdminConf = (activePage: string, conf: IAdminTabConfDto) => {
  const [pageConf, setPageConf] = useState<IAdminTabDto>();
  const [formConf, setFormConf] = useState<[string, IFormDto][]>([]);

  useEffect(() => {
    const pageConf = conf.tabs.find((tab) => tab.name === activePage);
    if (pageConf) {
      setPageConf(pageConf);
      setFormConf(Object.entries(pageConf.form));
    }
  }, [activePage, conf.tabs]);

  return { pageConf, formConf };
};
