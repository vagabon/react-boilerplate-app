import {
  HandleChangeType,
  JSONObject,
  MdCard,
  MdFormFile,
  MdFormSwitch,
  MdInputText,
} from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import AppFormik from '../../../../app/formik/AppFormik';
import { useMessage } from '../../../../hook/message/useMessage';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import CustomChatbotButton, { IAppChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import CustomFile from '../../../custom/file/component/CustomFile';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import NEWS_SCHEMA from '../../schema/news.schema.json';
import NewsCard from '../card/NewsCard';

export interface INewsFormProps extends INewsRouterProps, IBaseCustomSeoProps, IAppChatbotButtonProps {
  news: INewsDto;
}

const NewsForm: React.FC<INewsFormProps> = memo(({ endPoint, newsAction, news, ...rest }) => {
  const { setMessage } = useMessage();
  const { createOrUpdateNews } = useCreateNews(rest.apiUrl, endPoint, newsAction, news.id as number);
  const [newsForm, setNewsForm] = useState<INewsDto>({});
  const { handleChangeFile } = useCustomFormUpload(rest.apiUrl, endPoint);
  const [image, setImage] = useState('');

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

  const handleUpdateImage = useCallback(
    (file: string, closeModale?: () => void) => {
      setImage('![](' + rest.apiUrl + '/file/download?filename=' + file + ')');
      closeModale?.();
    },
    [rest.apiUrl],
  );

  return (
    <>
      <MdCard
        title={news.id ? getLocale('UPDATE') : getLocale('CREATE')}
        actions={
          <>
            <CustomFile apiUrl={rest.apiUrl} title='Image' directory={endPoint} callback={handleUpdateImage} />
            <CustomChatbotButton integrations={rest.integrations} />
          </>
        }>
        <AppFormik initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
          {(formikProps) => (
            <>
              {image}
              <MdInputText
                label={getLocale('FIELDS.TITLE')}
                name='title'
                {...formikProps}
                handleChange={handleChange(newsForm, formikProps.handleChange)}
                callbackCopy={setMessage}
              />
              <MdInputText
                label={getLocale('FIELDS.RESUME')}
                name='resume'
                textarea={3}
                {...formikProps}
                handleChange={handleChange(newsForm, formikProps.handleChange)}
                callbackCopy={setMessage}
              />
              <MdInputText
                label={getLocale('FIELDS.DESCRIPTION')}
                name='description'
                textarea={10}
                {...formikProps}
                handleChange={handleChange(newsForm, formikProps.handleChange)}
                callbackCopy={setMessage}
              />
              <MdFormFile
                label={getLocale('FIELDS.AVATAR')}
                name='avatar'
                handleChangeFile={handleChangeFile(handleChange(newsForm, formikProps.handleChange))}
              />
              <MdFormFile
                label={getLocale('FIELDS.IMAGE')}
                name='image'
                handleChangeFile={handleChangeFile(handleChange(newsForm, formikProps.handleChange))}
              />
              <MdInputText
                label={getLocale('FIELDS.TAGS')}
                name='tags'
                {...formikProps}
                handleChange={handleChange(newsForm, formikProps.handleChange)}
                callbackCopy={setMessage}
              />
              <MdFormSwitch label={'ACTIVE'} name='active' {...formikProps} />
            </>
          )}
        </AppFormik>
      </MdCard>
      <NewsCard {...rest} news={newsForm} endPoint={endPoint} withSummary={false} />
    </>
  );
});

export default NewsForm;
