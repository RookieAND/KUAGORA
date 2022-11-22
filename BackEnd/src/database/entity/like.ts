import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import BasicEntity from './basic';
import User from './user';
import Question from './question';

@Entity()
class Like extends BasicEntity {
  // [Relation] Like : Question = N : 1
  @ManyToOne(() => Question, (question) => question.likes)
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;

  // [Relation] Like : User = N : 1
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}

export default Like;
