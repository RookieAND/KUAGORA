import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Question from '@/database/entity/question';
import { Length } from 'class-validator';

@Entity()
class Keyword {
  @PrimaryGeneratedColumn()
  id!: number;

  @Length(2, 15)
  @Column('varchar')
  content!: string;

  // [Relation] Keyword : Question = N : 1
  @ManyToOne(() => Question, (question) => question.keywords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;
}

export default Keyword;
