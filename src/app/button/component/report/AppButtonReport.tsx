import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface IAppButtonReportProps {
  emailContact: string;
  subject: string;
  body: string;
  data: JSONObject;
}

export const AppButtonReport: React.FC<IAppButtonReportProps> = memo(({ emailContact, subject, body, data }) => {
  const { t } = useTranslation();

  const handleReport = () => {
    const translateSubject = t(subject, JSON.stringify(data));
    const translateBody = t(body, JSON.stringify(data));
    const mailtoLink = `mailto:"${emailContact}"?subject=${translateSubject}&body=${translateBody}`;

    window.open(mailtoLink);
  };

  return <MdButton color='error' label='SIGNALER' callback={handleReport} />;
});
