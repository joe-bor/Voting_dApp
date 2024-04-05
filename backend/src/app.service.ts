import { Injectable } from '@nestjs/common';
import { abi } from './assets/GroupOneToken.json';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  publicClient;

  constructor(private configService: ConfigService) {
    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
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

  getHello(): string {
    return 'Hello World!';
  }
}
