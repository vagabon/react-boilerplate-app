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
import { INewsDto } from '../../dto/NewsDto';
import NEWS_SCHEMA from '../../schema/news.schema.json';
import NewsCard from '../card/NewsCard';

export interface INewsFormProps {
  idNews: number;
}

const NewsForm: React.FC<INewsFormProps> = ({ idNews }) => {
  const { news, createOrUpdateNews } = useCreateNews();
  const [newsForm, setNewsForm] = useState<INewsDto>(news[idNews]);
  const { handleChangeFile } = useCustomFormUpload('news');

  useEffect(() => {
    setNewsForm(news[idNews]);
  }, [news, idNews]);

  const handleChange = useCallback(
    (newsState: INewsDto, callback: HandleChangeType) => (event: ChangeEvent<JSONObject>) => {
      callback(event);
      setNewsForm({
        ...newsState,
        [event.target['name' as keyof JSONObject]]: event.target['value' as keyof JSONObject],
      });
    },
    [],
  );

  return (
    <AppContent id='news-form' className='markdown-form'>
      <MdCard title={newsForm.id ? 'NEWS_UPDATE' : 'NEW_CREATE'}>
        <AppFormik initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
          {(props) => (
            <>
              <MdInputText
                label='Titre'
                name='title'
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdInputText
                label='Description'
                name='description'
                textarea={10}
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdFormFile
                label='AVATAR'
                name='avatar'
                handleChangeFile={handleChangeFile(newsForm.id, handleChange(newsForm, props.handleChange))}
              />
              <MdFormFile
                label='IMAGE'
                name='image'
                handleChangeFile={handleChangeFile(newsForm.id, handleChange(newsForm, props.handleChange))}
              />
              <MdFormSwitch label='Actif' name='active' {...props} />
            </>
          )}
        </AppFormik>
      </MdCard>
      <NewsCard news={newsForm} />
    </AppContent>
  );
};

export default NewsForm;
