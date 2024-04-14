import { I18nUtils, JSONObject, MdButton, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';

export interface IAppButtonReportProps {
  emailContact: string;
  subject: string;
  body: string;
  data: JSONObject;
}

const AppButtonReport: React.FC<IAppButtonReportProps> = memo(({ emailContact, subject, body, data }) => {
  const { t } = useAppTranslate();

  const handleReport = () => {
    const translateSubject = I18nUtils.translate(t, subject, data);
    const translateBody = I18nUtils.translate(t, body, data);
    const mailtoLink = `mailto:"${emailContact}"?subject=${translateSubject}&body=${translateBody}`;

    window.location.href = mailtoLink;
  };

  return <MdButton color='error' label='SIGNALER' callback={handleReport} />;
});

export default AppButtonReport;
