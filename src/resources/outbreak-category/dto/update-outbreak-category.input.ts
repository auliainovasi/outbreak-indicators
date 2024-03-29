import { BaseInterface } from 'src/interface/base/base.interface';
import { CreateOutbreakCategoryInput } from './create-outbreak-category.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class UpdateOutbreakCategoryInput
  extends PartialType(CreateOutbreakCategoryInput)
  implements BaseInterface
{
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'outbreak_category_id' })
  id: string;
}
