function TokenInteractions() {
  return (
    <>
      <div className="card w-96 bg-secondary text-primary-content ">
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Token Interactions!</p>
            </div>
          </h2>
          <form action="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Wallet Address</span>
              </div>
              <input type="text" placeholder="0xB36Ca00...14aFDd" className="input input-bordered w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Amount</span>
              </div>
              <input type="text" placeholder="1000n" className="input input-bordered w-full max-w-xs" />
            </label>
            <button className="btn btn-outline btn-accent">Mint</button>
            <button className="btn btn-outline btn-accent">Delegate</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default TokenInteractions;
