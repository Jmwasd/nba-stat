/* eslint-disable react/no-array-index-key */
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import useRecentMatch from '@/queries/game';
import { getDateKr, getHourKr } from '@/utils/formatter';
import { RecentMatchType } from '@/types/games';
import UseMediaQuery from '@/hooks/useMediaQuery';
import Loading from '../Loading';
import Title from '../Title';
import TeamLogo from '../TeamLogo';
import Error from '../Error';

const XL = 890;
const MD = 730;

const RecentMatch = () => {
  const [datePickerValue, setDatePickerValue] = useState<dayjs.Dayjs | null>(null);
  const [slidesNumber, setSlidesNumber] = useState<number>(0);
  const [slideDividedNumber, setSlideDividedNumber] = useState<number>(3);

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

  const mediaQueryCallback = (width: number) => {
    if (width < MD) {
      setSlideDividedNumber(1);
    }
    if (width < XL && width > MD) {
      setSlideDividedNumber(2);
    }
    if (width > XL) {
      setSlideDividedNumber(3);
    }
  };

  UseMediaQuery({ callback: mediaQueryCallback });

  const changeDate = (value: dayjs.Dayjs | null) => {
    setDatePickerValue(value);
    mutate();
    setSlidesNumber(0);
  };

  const handleSwipe = (direction: 1 | -1) => {
    let number = slidesNumber;
    setSlidesNumber((number += direction));
  };

  const getCardInfo = useCallback(
    (data: RecentMatchType[]) => {
      const newArray: RecentMatchType[][] = [];
      let accumulate: RecentMatchType[] = [];

      let count = 1;

      data.forEach((el) => {
        if (count % slideDividedNumber === 0) {
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
    },
    [slideDividedNumber],
  );

  if (isLoading) {
    return <Loading height="h-[150px]" />;
  }

  return (
    <Box>
      <Box className="h-[60px] pb-3">
        <Title text="최근 경기결과" className="text-center md:text-left" />
        <Box className="relative bottom-[57px] text-right">
          {datePickerValue && (
            <AutorenewIcon
              fontSize="large"
              color="inherit"
              className="mt-3 transition hover:rotate-180 cursor-pointer"
              onClick={() => changeDate(null)}
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
              <Box className="flex justify-center items-center">
                <ArrowBackIosNewIcon
                  sx={{
                    cursor: 'pointer',
                    visibility: !slidesNumber ? 'hidden' : 'visible',
                  }}
                  onClick={() => handleSwipe(-1)}
                />
              </Box>
              {item.map((el) => (
                <Box key={el.id} className="w-full mx-[15px]">
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
                                height="0"
                                className="my-0 mx-auto h-[70px]"
                              />
                            </Box>
                            <Typography className="text-xl text-center truncate">
                              {el.teams.home.nickname}
                            </Typography>
                          </Box>

                          <Box className="w-2/4">
                            {el.scores.home.points && el.scores.visitors.points ? (
                              <>
                                <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                                  {el.scores.home.points}
                                </Typography>

                                <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                                  {el.scores.visitors.points}
                                </Typography>
                                {el.status.long === 'In Play' && (
                                  <Box className="flex justify-center mt-[4px]">
                                    <Typography className="text-[12px] p-[3px] bg-red-500">
                                      LIVE
                                    </Typography>
                                  </Box>
                                )}
                              </>
                            ) : (
                              <Typography className="text-2xl text-center relative top-[28%]">
                                {getHourKr(el.date.start)}
                              </Typography>
                            )}
                          </Box>
                          <Box className="w-1/4">
                            <Box className="relative my-0 mx-auto">
                              <TeamLogo
                                code={el.teams.visitors.code}
                                alt="qwef"
                                width={70}
                                height={70}
                                className="my-0 mx-auto h-[70px]"
                              />
                            </Box>
                            <Typography className="text-xl text-center truncate">
                              {el.teams.visitors.nickname}
                            </Typography>
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Box>
              ))}
              <Box className="flex justify-center items-center">
                <ArrowForwardIosIcon
                  sx={{
                    cursor: 'pointer',
                    visibility:
                      slidesNumber >= getCardInfo(recentMatchResponse).length - 1
                        ? 'hidden'
                        : 'visible',
                  }}
                  onClick={() => handleSwipe(1)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecentMatch;
