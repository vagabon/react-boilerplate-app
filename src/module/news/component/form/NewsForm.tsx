import {
  HandleChangeType,
  JSONObject,
  MdCard,
  MdFormFile,
  MdFormSwitch,
  MdInputText,
} from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import NEWS_SCHEMA from '../../schema/news.schema.json';
import NewsCard from '../card/NewsCard';

export interface INewsFormProps extends INewsRouterProps {
  news: INewsDto;
}

const NewsForm: React.FC<INewsFormProps> = ({ endPoint, newsAction, news }) => {
  const { createOrUpdateNews } = useCreateNews(endPoint, newsAction, news.id as number);
  const [newsForm, setNewsForm] = useState<INewsDto>({});
  const { handleChangeFile } = useCustomFormUpload(endPoint);

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
    <AppContent id='news-form' className='markdown-form'>
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
      <NewsCard news={newsForm} endPoint={endPoint} />
    </AppContent>
  );
};

export default NewsForm;
