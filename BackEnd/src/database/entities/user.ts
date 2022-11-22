import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import RequestPost from './request';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('varchar', { length: 20 })
  nickname!: string;

  @OneToMany(() => RequestPost, (request) => request.user)
  requestPosts!: RequestPost[];
}

export default User;
