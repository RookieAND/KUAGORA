import questionRouter from '@/routes/question';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BasicEntity from '@/database/entity/basic';
import Question from '@/database/entity/question';
import User from '@/database/entity/user';

@Entity()
class Comment extends BasicEntity {
  @Column('text')
  content!: string;

  // [Relation] Comment : User = N : 1
  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({
    name: 'user_uuid',
  })
  user!: User;

  @ManyToOne(() => Question, (question) => question.comments)
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;
}

export default Comment;
