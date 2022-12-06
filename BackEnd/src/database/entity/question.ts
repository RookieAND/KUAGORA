import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Length } from 'class-validator';

import BasicEntity from '@/database/entity/basic';
import Like from '@/database/entity/like';
import User from '@/database/entity/user';
import Comment from '@/database/entity/comment';
import Keyword from '@/database/entity/keyword';

@Entity()
class Question extends BasicEntity {
  @Length(1, 50)
  @Column('varchar', { length: 50 })
  title!: string;

  @Column('text')
  content!: string;

  @Column('enum', { enum: ['progressed', 'completed'], default: 'progressed' })
  state!: 'progressed' | 'completed';

  // [Relation] Question : User = N : 1
  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({
    name: 'user_uuid',
  })
  user!: User;

  // [Relation] Question : Like = 1 : N
  @OneToMany(() => Like, (like) => like.question)
  likes!: Like[];

  // [Relation] Question : Comment = 1 : N
  @OneToMany(() => Comment, (comment) => comment.question)
  comments!: Comment[];

  // [Relation] Question : Keyword = 1 : N
  @OneToMany(() => Keyword, (keyword) => keyword.question)
  keywords!: Keyword[];
}

export default Question;
