import { ArgsType } from '@nestjs/graphql';
import { BaseArgs } from 'src/classes/dto/base.args/base.args';

@ArgsType()
export class GetOutbreakCategoryArgs extends BaseArgs {}
