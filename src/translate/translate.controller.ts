import { Controller, Get, Body } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { Result } from './entities/result.entitiy';
import { Translate } from './entities/translate.entitiy';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get()
  translate(@Body() body: Result): Promise<Translate>{
    return this.translateService.translateWord(body);
  }
}
