import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyRemoveAssociationMixin, HasManySetAssociationsMixin, Optional } from 'sequelize';
import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import sequelizeConnection from '../config';
import Project from './project';
import Task from './task';
import Timer from './timer';
import UserProject from './user_project';

export interface UserAttributes {
  id: number;
  fullName: string;
  email: string;
  role: string;
  passwordHash: string;
  dateOfBirth: string;
  isSuspended?: boolean;
  verificationToken?: string;
  notifyAfter?: number;
  stopTimerAfter?: string;
  medianOfTimers?: number;
  dailySummaries?: boolean;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'isSuspended'> { }

@Table
class User extends Model<UserAttributes, UserInput> {
  declare getTimers: HasManyGetAssociationsMixin<Timer>;
  declare addTimer: HasManyAddAssociationMixin<Timer, number>;
  declare addTask: HasManyAddAssociationMixin<Task, number>;
  declare removeTask: HasManyRemoveAssociationMixin<User, number>;
  @BelongsToMany(() => Project, () => UserProject)
  projects!: Array<Project>;

  @HasMany(() => Timer, 'userId')
  timers!: Timer[];

  @HasMany(() => Task, 'assigneeId')
  tasks!: Task[];

  @Column
  fullName!: string;

  @Column
  email!: string;

  @Column
  role!: string;

  @Column
  passwordHash!: string;

  @Column
  isSuspended!: boolean;

  @Column({ defaultValue: 'pending' })
  status!: string;

  @Column
  verificationToken!: string;

  @Column
  dateOfBirth!: string;

  @Column
  notifyAfter!: number;

  @Column
  stopTimerAfter!: string;

  @Column
  medianOfTimers!: number;

  @Column({ defaultValue: false })
  dailySummaries!: boolean;

}

export default User;
