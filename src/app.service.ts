import { Injectable } from '@nestjs/common';

type objectType = {
  result: string
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  run(): {result: string} {
    return {
	result: 'test result'
    };
  }
}
