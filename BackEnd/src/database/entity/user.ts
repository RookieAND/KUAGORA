import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';

import { SocialPlatform } from '@/types/social';
import Question from './question';
import Comment from './comment';
import Like from './like';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @CreateDateColumn({ name: 'register_at' })
  registerAt!: Date;

  @Column('enum', {
    enum: ['naver', 'kakao', 'google'],
  })
  social!: SocialPlatform;

  @Length(1, 20)
  @Column('varchar')
  nickname!: string;

  @IsEmail()
  @Column('varchar', { length: 255 })
  email!: string;

  // [Relation] User : Question = 1 : N
  @OneToMany(() => Question, (question) => question.user)
  questions!: Question[];

  // [Relation] User : Comment = 1 : N
  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  // [Relation] User : Like = 1 : N
  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];
}

export default User;
