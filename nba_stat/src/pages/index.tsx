import ConferenceStanding from "@/components/conferenceStanding";
import Layout from "@/components/layout";
import RecentMatch from "@/components/recentMatch";

export default function Home() {
  return (
    <>
      <Layout></Layout>
      <div
        style={{
          margin: "2rem 2rem",
          background: "#edecec",
        }}
      >
        <RecentMatch></RecentMatch>
        <div style={{ display: "flex" }}>
          <ConferenceStanding></ConferenceStanding>
          <ConferenceStanding></ConferenceStanding>
        </div>
      </div>
    </>
  );
}
