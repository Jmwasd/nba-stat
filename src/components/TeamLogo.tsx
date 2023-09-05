/* eslint-disable react/jsx-props-no-spreading */
import TEAM_CODE from '@/consts/teamCode';
import { TeamCodeType } from '@/types/common';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

interface Props extends ImageProps {
  code: TeamCodeType;
}

const TeamLogo = ({ code, ...props }: Omit<Props, 'src'>) => {
  const imageSource = TEAM_CODE[code];
  return <Image src={imageSource} {...props} />;
};

export default TeamLogo;
