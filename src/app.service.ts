import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  handleNotFound(): never {
    throw new NotFoundException(
      'The specified endpoint could not be found. Only the /translate endpoint is active.',
    );
  }
}
