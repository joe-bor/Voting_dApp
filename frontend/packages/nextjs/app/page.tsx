"use client";

import { useState } from "react";
import Link from "next/link";
import BallotDetails from "./_components/BallotDetails";
import TokenInteractions from "./_components/TokenInteractions";
import UserStats from "./_components/UserStats";
import ViewProposalsModal from "./_components/ViewProposalsModal";
import VoteModal from "./_components/VoteModal";
import type { NextPage } from "next";
import { useStep } from "usehooks-ts";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [ballotAddress, setBallotAddress] = useState("");
  const [isViewingProposals, setIsViewingProposals] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  return (
    <>
      {isViewingProposals && (
        <ViewProposalsModal
          ballotAddress={ballotAddress}
          isViewingProposals={isViewingProposals}
          setIsViewingProposals={setIsViewingProposals}
        />
      )}
      {isVoting && <VoteModal isVoting={isVoting} setIsVoting={setIsVoting} ballotAddress={ballotAddress} />}

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Voting dApp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p> */}
          {/* <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p> */}
        </div>

        <div className="flex flex-row justify-center gap-8 bg-base-300 w-full mt-8 px-8 py-12">
          <UserStats address={connectedAddress || ""} />
          <BallotDetails
            ballotAddress={ballotAddress || ""}
            setBallotAddress={setBallotAddress}
            setIsViewingProposals={setIsViewingProposals}
            setIsVoting={setIsVoting}
          />
          <TokenInteractions />

          {/* <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
