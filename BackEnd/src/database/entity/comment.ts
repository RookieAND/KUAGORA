import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BasicEntity from './basic';
import User from './user';

@Entity()
class Comment extends BasicEntity {
  @Column('text')
  content!: string;

  // [Relation] Comment : User = N : 1
  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}

export default Comment;
