import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { I18nUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/i18n/I18nUtils';
import { memo } from 'react';

export interface IAppButtonReportProps {
  emailContact: string;
  subject: string;
  body: string;
  data: JSONObject;
}

export const AppButtonReport: React.FC<IAppButtonReportProps> = memo(({ emailContact, subject, body, data }) => {
  const { t } = useAppTranslate();

  const handleReport = () => {
    const translateSubject = I18nUtils.translate(t, subject, data);
    const translateBody = I18nUtils.translate(t, body, data);
    const mailtoLink = `mailto:"${emailContact}"?subject=${translateSubject}&body=${translateBody}`;

    window.location.href = mailtoLink;
  };

  return <MdButton color='error' label='SIGNALER' callback={handleReport} />;
});
