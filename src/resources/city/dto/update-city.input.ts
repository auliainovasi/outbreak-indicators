import { BaseInputInterface } from 'src/interfaces/dto/base.input/base.input.interface';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateCityInput } from './create-city.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCityInput
  extends PartialType(CreateCityInput)
  implements BaseInputInterface
{
  @Field()
  @PrimaryGeneratedColumn('increment', { name: 'city_id' })
  id: number;
}
