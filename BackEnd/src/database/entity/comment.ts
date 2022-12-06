import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import BasicEntity from '@/database/entity/basic';
import Question from '@/database/entity/question';
import User from '@/database/entity/user';

@Entity()
class Comment extends BasicEntity {
  @Column('text')
  content!: string;

  @Column('boolean', { name: 'is_answered', default: false })
  isAnswered!: boolean;

  // [Relation] Comment : User = N : 1
  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({
    name: 'user_uuid',
  })
  user!: User;

  // [Relation] Comment : Question = N : 1
  @ManyToOne(() => Question, (question) => question.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question!: Question;

  // MissingDeleteDateColumnError 에러 해결을 위해 추가
  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedDate!: Date;
}

export default Comment;
