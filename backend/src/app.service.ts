import { Injectable } from '@nestjs/common';
import { abi } from './assets/GroupOneToken.json';
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
  toHex,
} from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  publicClient;
  walletClient;

  constructor(private configService: ConfigService) {
    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });

    this.walletClient = createWalletClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
      account: privateKeyToAccount(
        `0x${this.configService.get<string>('PRIVATE_KEY')}`,
      ),
    });
  }

  async getTokenName(): Promise<string> {
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi,
      functionName: 'name',
    });

    return name;
  }

  async getTokenSymbol(): Promise<string> {
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi,
      functionName: 'symbol',
    });

    return name;
  }

  getContractAddress() {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  async getTotalSupply() {
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'totalSupply',
    });

    return formatEther(totalSupply);
  }

  async getTokenBalance(address: string) {
    const tokenBalance = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'balanceOf',
      args: [address],
    });

    return formatEther(tokenBalance);
  }

  async getTransactionReceipt(hash: string) {
    const receipt = await this.publicClient.getTransactionReceipt({ hash });

    return receipt;
  }

  async getServerWalletAddress() {
    const walletAddresses = await this.walletClient.getAddresses();

    return walletAddresses[0];
  }

  async checkMinterRole(address: string): Promise<boolean> {
    const minterRoleHash = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'MINTER_ROLE',
    });

    const isMinter = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'hasRole',
      args: [minterRoleHash, address],
    });

    return isMinter;
  }

  async mintTokens(address: string, value: string): Promise<string> {
    const hash = await this.walletClient.writeContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'mint',
      args: [address, parseEther(value)],
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    return receipt;
  }

  async checkVotingPower(address: string): Promise<string> {
    const votingPower = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'getVotes',
      args: [address],
    });

    return formatEther(votingPower);
  }

  async delegateVotingPower(address: string) {
    const hash = await this.walletClient.writeContract({
      address: this.getContractAddress(),
      abi,
      functionName: 'delegate',
      args: [address],
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    return receipt;
  }

  async deployBallotContract(
    proposalNames,
    tokenContractAddress,
    targetBlockNumber,
  ) {
    const proposalNamesBytes32 = proposalNames.map((prop) =>
      toHex(prop, { size: 32 }),
    );

    const hash = await this.walletClient.deployContract({});
    //TODO: needs abi, bytecode, account -> compile from scaffold-eth2 first ?
  }
}
