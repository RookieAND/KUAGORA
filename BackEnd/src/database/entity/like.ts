import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import User from './user';
import Question from './question';

@Entity()
class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  // [Relation] Like : Question = N : 1
  @ManyToOne(() => Question, (question) => question.likes)
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;

  // [Relation] Like : User = N : 1
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({
    name: 'user_uuid',
  })
  user!: User;
}

export default Like;
