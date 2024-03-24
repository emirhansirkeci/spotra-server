import { Controller, Post, Body } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { Result } from './entitiies/result.entitiy';
import { Translate } from './entitiies/translate.entitiy';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  translate(@Body() body: Result): Promise<Translate>{
    return this.translateService.translateWord(body);
  }
}
