import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { HandleChangeType } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdFormFile } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/file/MdFormFile';
import { MdFormSwitch } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/switch/MdFormSwitch';
import { MdInputText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { AppForm } from '../../../../app/form/component/AppForm';
import { useAppMessage } from '../../../../app/message/hook/useAppMessage';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import { CustomChatbotButton, ICustomChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import { CustomFile } from '../../../custom/file/component/CustomFile';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import { NewsCard } from '../card/NewsCard';

import NEWS_SCHEMA from '../../schema/news.schema.json';

export interface INewsFormProps extends INewsRouterProps, IBaseCustomSeoProps, ICustomChatbotButtonProps {
  news: INewsDto;
}

export const NewsForm: React.FC<INewsFormProps> = memo(({ endPoint, newsAction, news, ...rest }) => {
  const { setMessage } = useAppMessage();
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
            <CustomFile
              variant='text'
              apiUrl={rest.apiUrl}
              title='Image'
              directory={endPoint}
              callback={handleUpdateImage}
            />
            <CustomChatbotButton integrations={rest.integrations} />
          </>
        }>
        <AppForm initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
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
        </AppForm>
      </MdCard>
      <NewsCard {...rest} news={newsForm} endPoint={endPoint} withSummary={false} />
    </>
  );
});
