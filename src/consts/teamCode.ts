import { TeamCodeType } from '@/types/common';
import { StaticImageData } from 'next/image';

import Nuggets from '@/assets/teamLogo/Nuggets.png';
import Bucks from '@/assets/teamLogo/Bucks.png';
import Celtics from '@/assets/teamLogo/Celtics.png';
import ers from '@/assets/teamLogo/76ers.png';
import Timberwolves from '@/assets/teamLogo/Timberwolves.png';
import Thunder from '@/assets/teamLogo/Thunder.png';
import Jazz from '@/assets/teamLogo/Jazz.png';
import TrailBlazers from '@/assets/teamLogo/Trail-Blazers.png';
import Kings from '@/assets/teamLogo/Kings.png';
import Suns from '@/assets/teamLogo/Suns.png';
import Clippers from '@/assets/teamLogo/Clippers.png';
import Warriors from '@/assets/teamLogo/Warriors.png';
import Lakers from '@/assets/teamLogo/Lakers.png';
import Grizzlies from '@/assets/teamLogo/Grizzlies.png';
import Pelicans from '@/assets/teamLogo/Pelicans.png';
import Mavericks from '@/assets/teamLogo/Mavericks.png';
import Rockets from '@/assets/teamLogo/Rockets.png';
import Spurs from '@/assets/teamLogo/Spurs.png';
import Knicks from '@/assets/teamLogo/Knicks.png';
import Raptors from '@/assets/teamLogo/Raptors.png';
import Cavaliers from '@/assets/teamLogo/Cavaliers.png';
import Bulls from '@/assets/teamLogo/Bulls.png';
import Pacers from '@/assets/teamLogo/Pacers.png';
import Pistons from '@/assets/teamLogo/Pistons.png';
import Nets from '@/assets/teamLogo/Nets.png';
import Hawks from '@/assets/teamLogo/Hawks.png';
import Heat from '@/assets/teamLogo/Heat.png';
import Wizards from '@/assets/teamLogo/Wizards.png';
import Magic from '@/assets/teamLogo/Magic.png';
import Hornets from '@/assets/teamLogo/Hornets.png';

const TEAM_CODE: { [key in TeamCodeType]: StaticImageData } = {
  DEN: Nuggets,
  MIL: Bucks,
  BOS: Celtics,
  PHI: ers,
  MIN: Timberwolves,
  OKC: Thunder,
  UTA: Jazz,
  POR: TrailBlazers,
  SAC: Kings,
  PHX: Suns,
  LAC: Clippers,
  GSW: Warriors,
  LAL: Lakers,
  MEM: Grizzlies,
  NOP: Pelicans,
  DAL: Mavericks,
  HOU: Rockets,
  SAS: Spurs,
  NYK: Knicks,
  BKN: Nets,
  TOR: Raptors,
  CLE: Cavaliers,
  CHI: Bulls,
  IND: Pacers,
  DET: Pistons,
  ATL: Hawks,
  MIA: Heat,
  WAS: Wizards,
  ORL: Magic,
  CHA: Hornets,
};

export default TEAM_CODE;
