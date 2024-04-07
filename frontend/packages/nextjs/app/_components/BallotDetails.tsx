import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth/";

type Props = {
  address: AddressType;
};

function BallotDetails({ address }: Props) {
  return (
    <>
      <div className="card w-96 bg-secondary text-primary-content ">
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Ballot Address:</p>
            </div>
          </h2>
          <Address address={address} format="short" size="xs" />
          <p>Short description of the ballot?</p>
          <div className="card-actions justify-end">
            <button className="btn">See Proposals</button>
            <button className="btn">Vote Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BallotDetails;
