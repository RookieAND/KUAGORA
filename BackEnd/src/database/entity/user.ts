import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import Question from './question';
import Comment from './comment';
import Like from './like';

type SocialPlatform = 'naver' | 'kakao' | 'google';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @CreateDateColumn({ name: 'register_at' })
  registerAt!: Date;

  @Column('enum', {
    name: 'social_platform',
    enum: ['naver', 'kakao', 'google'],
  })
  social!: SocialPlatform;

  @Column('varchar', { length: 20 })
  nickname!: string;

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