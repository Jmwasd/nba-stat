import recentMatchData from "@/data/recentMatch.json";
import style from "@/styles/recentMatch.module.scss";
import { getDate } from "@/utils/formatter";
import { useState } from "react";

const RecentMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: number) => {
    setCurrentIndex((currentIndex) => currentIndex + direction);
    const pushData = recentMatchData.response[currentIndex];
    recentMatchData.response.push(pushData);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className={style.recentMatchLayout}
        style={{
          transform: `translateX(${-19 * currentIndex}%)`,
        }}
      >
        {recentMatchData.response.map((el, idx) => {
          return (
            <div className={style.recentMatchBox} key={el.id + idx}>
              <div className={style.date}>{getDate(el.date.start)}</div>
              <div className={style.card}>
                <div className={style.homeCardContents}>
                  <div className={style.logo}>
                    <img src={el.teams.home.logo} width={70} height={70}></img>
                    <div className={style.nickName}>
                      {el.teams.home.nickname}
                    </div>
                  </div>
                  <div className={style.score}>{el.scores.home.points}</div>
                </div>

                <div className={style.visitorsCardContents}>
                  <div className={style.score}>{el.scores.visitors.points}</div>
                  <div className={style.logo}>
                    <img
                      src={el.teams.visitors.logo}
                      width={70}
                      height={70}
                    ></img>
                    <div className={style.nickName}>
                      {el.teams.visitors.nickname}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.pagination}>
        <div
          onClick={() => handleSwipe(-swipeNumber)}
          style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
        >
          <div className={style.arrowLeft}></div>
        </div>
        <div onClick={() => handleSwipe(swipeNumber)}>
          <div className={style.arrowRight}></div>
        </div>
      </div>
    </div>
  );
};

const swipeNumber = 1;

export default RecentMatch;
