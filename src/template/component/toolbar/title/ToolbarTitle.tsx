import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo } from 'react';

export interface IToolbarTitleProps {
  image: string;
  title: string;
}

export const ToolbarTitle: React.FC<IToolbarTitleProps> = memo(({ image, title }) => {
  return (
    <MdTypo className='flex flex1 justify-center' variant='body2' align='left' noWrap={true}>
      <MdLink href='/' className='flex-row gap10 overflow-hidden text-black font-weight-450 line-height-15'>
        <img src={image} width={40} title={title} alt={'Logo de ' + title} />
        <span className='flex justify-center overflow-hidden text-xl'>
          <span className='ellipsis'>{title}</span>
        </span>
      </MdLink>
    </MdTypo>
  );
});
