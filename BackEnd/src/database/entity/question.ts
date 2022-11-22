import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

import BasicEntity from './basic';
import Like from './like';
import User from './user';

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
}

export default Question;
