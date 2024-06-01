import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useTranslate';
import { memo } from 'react';

export interface IAppButtonReportProps {
  emailContact: string;
  subject: string;
  body: string;
  data: JSONObject;
}

export const AppButtonReport: React.FC<IAppButtonReportProps> = memo(({ emailContact, subject, body, data }) => {
  const { translate } = useTranslate();

  const handleReport = () => {
    const translateSubject = translate(subject, JSON.stringify(data));
    const translateBody = translate(body, JSON.stringify(data));
    const mailtoLink = `mailto:"${emailContact}"?subject=${translateSubject}&body=${translateBody}`;

    window.open(mailtoLink);
  };

  return <MdButton color='error' label='SIGNALER' callback={handleReport} />;
});
