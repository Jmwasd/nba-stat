/* eslint-disable react/no-array-index-key */
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import useRecentMatch from '@/hooks/game';
import { getDateKr } from '@/utils/formatter';
import { RecentMatchType } from '@/types/games';
import Loading from '../Loading';
import Title from '../Title';
import TeamLogo from '../TeamLogo';
import Error from '../Error';

const cardSpace = {
  0: 'ml-[30px]',
  1: 'mx-[15px]',
  2: 'mr-[30px]',
};

type CardSpaceType = keyof typeof cardSpace;

const SLIDE_DVIDED_NUMBER = 3;

const RecentMatch = () => {
  const [datePickerValue, setDatePickerValue] = useState<dayjs.Dayjs | null>(null);
  const [slidesNumber, setSlidesNumber] = useState<number>(0);

  const parsingDate = () => {
    if (!datePickerValue) return null;
    const year = datePickerValue.year();
    let month = `${datePickerValue.month() + 1}`;
    let day = `${datePickerValue.date()}`;
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${year}-${month}-${day}`;
  };

  const { data: recentMatchResponse, isLoading, mutate } = useRecentMatch(parsingDate());

  const changeDate = (value: dayjs.Dayjs | null) => {
    if (value) setDatePickerValue(value);
    mutate();
  };

  const refreshRecentMatch = () => {
    setDatePickerValue(null);
    mutate();
  };

  const handleSwipe = (direction: 1 | -1) => {
    let number = slidesNumber;
    setSlidesNumber((number += direction));
  };

  const getCardInfo = useCallback((data: RecentMatchType[]) => {
    const newArray: RecentMatchType[][] = [];
    let accumulate: RecentMatchType[] = [];

    let count = 1;

    data.forEach((el, idx) => {
      if (count % SLIDE_DVIDED_NUMBER === 0 && idx !== 0) {
        accumulate.push(el);
        newArray.push(accumulate);
        count = 1;
        accumulate = [];
        return el;
      }
      accumulate.push(el);
      count += 1;

      return el;
    });

    return newArray;
  }, []);

  const getCardspaceStyle = (idx: CardSpaceType) => cardSpace[idx];

  if (isLoading) {
    return <Loading height="h-[150px]" />;
  }

  return (
    <Box className="pb-7">
      <Box className="flex pb-3">
        <Title text="경기결과" className="flex items-center relative left-[47.5%] pb-0" />
        <Box className="flex items-center relative bottom-2 ">
          {datePickerValue && (
            <AutorenewIcon
              fontSize="large"
              color="inherit"
              className="mr-2 transition hover:rotate-180 cursor-pointer"
              onClick={() => refreshRecentMatch()}
            />
          )}
          <DatePicker value={datePickerValue} onChange={(value) => changeDate(value)} />
        </Box>
      </Box>
      {!recentMatchResponse ? (
        <Error text="일치하는 데이터가 없습니다. 다른 날짜를 선택해주세요" height="h-20" />
      ) : (
        <Box className="flex overflow-hidden">
          {getCardInfo(recentMatchResponse).map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '100%',
                display: 'flex',
                transition: 'all ease-in-out 300ms',
                transform: `translateX(-${slidesNumber * 100}%)`,
              }}
            >
              {item.map((el, idx) => (
                <Box key={el.id} className={`w-[100%] ${getCardspaceStyle(idx as CardSpaceType)}`}>
                  <Link
                    href={{
                      pathname: `/game/${el.id}`,
                      query: {
                        homeLineScore: el.scores.home.linescore,
                        visitorLineScore: el.scores.visitors.linescore,
                        homeTeamName: el.teams.home.name,
                        visitorTeamName: el.teams.visitors.name,
                      },
                    }}
                  >
                    <Card>
                      <CardActionArea className="flex p-2 flex-col">
                        <Typography>{getDateKr(el.date.start)}</Typography>
                        <Box className="flex min-w-full">
                          <Box className="w-1/4">
                            <Box className="relative my-0 mx-auto">
                              <TeamLogo
                                code={el.teams.home.code}
                                alt="team-logo"
                                width={70}
                                height={70}
                                className="my-0 mx-auto"
                              />
                            </Box>
                            <Typography className="text-xl text-center">
                              {el.teams.home.nickname}
                            </Typography>
                          </Box>
                          <Box className="w-2/4">
                            <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                              {el.scores.home.points}
                            </Typography>
                            <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                              {el.scores.visitors.points}
                            </Typography>
                          </Box>
                          <Box className="w-1/4">
                            <Box className="relative w-[70px] h-[70px] my-0 mx-auto">
                              <TeamLogo
                                code={el.teams.visitors.code}
                                alt="qwef"
                                width={70}
                                height={70}
                              />
                            </Box>
                            <Typography className="text-xl text-center">
                              {el.teams.visitors.nickname}
                            </Typography>
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
      <Box className="relative bottom-[76px] flex justify-between">
        <ArrowBackIosNewIcon
          sx={{
            cursor: 'pointer',
            visibility: !slidesNumber ? 'hidden' : 'visible',
          }}
          onClick={() => handleSwipe(-1)}
        />
        <ArrowForwardIosIcon
          sx={{
            cursor: 'pointer',
            visibility: slidesNumber === SLIDE_DVIDED_NUMBER ? 'hidden' : 'visible',
          }}
          onClick={() => handleSwipe(1)}
        />
      </Box>
    </Box>
  );
};

export default RecentMatch;
