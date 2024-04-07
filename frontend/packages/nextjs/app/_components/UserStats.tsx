function UserStats() {
  return (
    <>
      <div className="stats stats-vertical shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Token Balance</div>
          <div className="stat-value">10000 </div>
          <div className="stat-desc">GroupOneToken - GOT</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Voting Power</div>
          <div className="stat-value text-secondary">88</div>
          <div className="stat-desc text-secondary">88/100</div>
        </div>

        {/* <div className="stat place-items-center">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div> */}
      </div>
    </>
  );
}
export default UserStats;
