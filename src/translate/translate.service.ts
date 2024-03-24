import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { translate, lang } from 'bing-translate-api';
import { Translate } from './entities/translate.entitiy';
import { Result } from './entities/result.entitiy';

@Injectable()
export class TranslateService {
  async translateWord(body: Translate): Promise<Result> {
    let { content, source, target } = body;

    source = source.toLowerCase();
    target = target.toLowerCase();

    if (!content || !content?.trim()) {
      throw new BadRequestException('Invalid request.', { description: 'Please provide a valid content parameter.'});
    }

    if (!target) {
      throw new BadRequestException('Invalid request.', { description: 'Please provide a valid target langauge parameter.'});
    }

    if (source == target || source?.trim() == "" || source == "au") {
      source = "auto-detect";
    }

    if (!lang.isSupported(source) && source != "auto-detect") {
      throw new BadRequestException('Unsupported language.', { description: 'Provided source language is not supported.'});
    }

    if (!lang.isSupported(target)) {
      throw new BadRequestException('Unsupported language.', { description: 'Provided target language is not supported.'});
    }

    try {
      const result = await translate(content, source, target)
        .then((response) => { console.log(response); return response.translation })
        .then((translation) => { return translation.charAt(0).toUpperCase() + translation.slice(1).toLowerCase()})
        .then((formattedResult) => {
          return {
            content,
            result: formattedResult,
            source: source.toUpperCase(),
            target: target.toUpperCase() 
          }
      })

      return result;
    } 
    catch(e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
