import { useEffect, useRef, useState } from "react";

type Prop = {
  isVoting: boolean;
  setIsVoting: (viewing: boolean) => void;
  ballotAddress: string;
};

function VoteModal({ isVoting, setIsVoting, ballotAddress }: Prop) {
  const voteModalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (voteModalRef.current) {
      isVoting ? voteModalRef.current.showModal() : voteModalRef.current.close();
    }
  }, [isVoting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const proposalIndexInput = e.currentTarget.elements[0] as HTMLInputElement;
    const voteAmountInput = e.currentTarget.elements[1] as HTMLInputElement;

    const proposalIndex = Number(proposalIndexInput.value);
    const votingPowerAmount = Number(voteAmountInput.value);

    const requestBody = {
      ballotAddress,
      votingPowerAmount,
      proposalIndex,
    };

    try {
      const response = await fetch(`http://localhost:3001/cast-vote/${ballotAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Vote cast successfully:", data);
      // Handle successful voting here, possibly closing the modal or showing a success message
      setIsVoting(false); // Close the modal after successful voting
      // TODO: create a toast to tell user it was successful
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" ref={voteModalRef} onClose={() => setIsVoting(false)}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">It's time to vote!</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Proposal Index"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Amount of votes"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <button className="btn btn-outline btn-accent mt-4">Cast Vote</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
export default VoteModal;
