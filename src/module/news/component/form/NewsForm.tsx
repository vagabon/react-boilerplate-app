import {
  HandleChangeType,
  JSONObject,
  MdCard,
  MdFormFile,
  MdFormSwitch,
  MdInputText,
} from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import NEWS_SCHEMA from '../../schema/news.schema.json';
import NewsCard from '../card/NewsCard';

export interface INewsFormProps extends INewsRouterProps, IBaseCustomSeoProps {
  news: INewsDto;
}

const NewsForm: React.FC<INewsFormProps> = memo(({ endPoint, newsAction, news, ...rest }) => {
  const { createOrUpdateNews } = useCreateNews(rest.apiUrl, endPoint, newsAction, news.id as number);
  const [newsForm, setNewsForm] = useState<INewsDto>({});
  const { handleChangeFile } = useCustomFormUpload(rest.apiUrl, endPoint);

  useEffect(() => {
    setNewsForm(news ?? {});
  }, [news]);

  const handleChange = useCallback(
    (newsState: INewsDto, callback?: HandleChangeType) => (event: ChangeEvent<JSONObject>) => {
      callback?.(event);
      setNewsForm({
        ...newsState,
        [event.target['name' as keyof JSONObject]]: event.target['value' as keyof JSONObject],
      });
    },
    [],
  );

  const getLocale = useCallback(
    (locale: string) => {
      return endPoint.toUpperCase() + ':' + locale;
    },
    [endPoint],
  );

  return (
    <AppContent
      {...rest}
      id='news-form'
      className='markdown-form'
      seoTitle='SEO:NEWS.TITLE'
      seoDescription='SEO:NEWS.DESCRIPTION'>
      <MdCard title={news.id ? getLocale('UPDATE') : getLocale('CREATE')}>
        <AppFormik initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
          {(props) => (
            <>
              <MdInputText
                label={getLocale('FIELDS.TITLE')}
                name='title'
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdInputText
                label={getLocale('FIELDS.RESUME')}
                name='resume'
                textarea={3}
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdInputText
                label={getLocale('FIELDS.DESCRIPTION')}
                name='description'
                textarea={10}
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdFormFile
                label={getLocale('FIELDS.AVATAR')}
                name='avatar'
                handleChangeFile={handleChangeFile(newsForm.id, handleChange(newsForm, props.handleChange))}
              />
              <MdFormFile
                label={getLocale('FIELDS.IMAGE')}
                name='image'
                handleChangeFile={handleChangeFile(newsForm.id, handleChange(newsForm, props.handleChange))}
              />
              <MdInputText
                label={getLocale('FIELDS.TAGS')}
                name='tags'
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdFormSwitch label={'ACTIVE'} name='active' {...props} />
            </>
          )}
        </AppFormik>
      </MdCard>
      <NewsCard {...rest} news={newsForm} endPoint={endPoint} />
    </AppContent>
  );
});

export default NewsForm;
