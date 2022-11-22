import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import BasePostEntity from './base-post';
import User from './user';

@Entity()
class RequestPost extends BasePostEntity {
  @Column('varchar', { length: 255 })
  title!: string;

  @Column('text')
  content!: string;

  @Column('enum', { enum: ['progressed', 'completed'], default: 'progressed' })
  state!: 'progressed' | 'completed';

  @ManyToOne(() => User, (user) => user.requestPosts)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}

export default RequestPost;
