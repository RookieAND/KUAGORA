import questionRouter from '@/routes/question';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BasicEntity from '@/database/entity/basic';
import Question from '@/database/entity/question';
import { Length } from 'class-validator';

@Entity()
class Keyword extends BasicEntity {
  @Length(1, 15)
  @Column('varchar')
  content!: string;

  // [Relation] Keyword : Question = N : 1
  @ManyToOne(() => Question, (question) => question.comments)
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;
}

export default Keyword;
