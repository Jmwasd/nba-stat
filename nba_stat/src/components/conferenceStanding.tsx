import conferenceData from "../data/eastConference.json";
import style from "../styles/conferenceStanding.module.scss";

const ConferenceStanding = () => {
  return (
    <table className={style.rank_table}>
      <thead>
        <tr>
          <th colSpan={13}>서부 컨퍼런스</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>팀</td>
          <td>승</td>
          <td>패</td>
          <td>승률</td>
          <td>홈</td>
          <td>원정</td>
          <td>최근 10경기</td>
          <td>연속</td>
        </tr>
        {sortData().map((el, idx) => {
          return (
            <tr key={el.team.id}>
              <td>{idx + 1}</td>
              <td>
                <img src={el.team.logo} width={17} height={17} />
                <span style={{ marginLeft: "5px" }}>{el.team.name}</span>
              </td>
              <td>{el.conference.win}</td>
              <td>{el.conference.loss}</td>
              <td>{el.win.percentage}</td>
              <td>
                {el.win.home}-{el.loss.home}
              </td>
              <td>
                {el.win.away}-{el.loss.away}
              </td>
              <td>
                {el.streak} {el.winStreak ? "W" : "L"}
              </td>
              <td>
                {el.win.lastTen}-{el.loss.lastTen}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ConferenceStanding;

const sortData = () => {
  return conferenceData.response.sort((a, b) => {
    return a.conference.rank - b.conference.rank;
  });
};
