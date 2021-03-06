import { HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyRemoveAssociationMixin, Optional } from 'sequelize';
import { Table, Model, BelongsTo, HasMany, ForeignKey, Column } from 'sequelize-typescript'
import Project from './project';
import Timer from './timer';
import User from './user';

export interface TaskAttributes {
  id: number;
  description: string;
  status: string;
  taskLink?: string;
}

export interface TaskInput extends Optional<TaskAttributes, 'id'> { }

@Table
class Task extends Model<TaskInput, TaskInput> {
  declare addTimer: HasManyAddAssociationMixin<Timer, number>;
  declare getTimers: HasManyGetAssociationsMixin<Timer>;
  declare addAssignee: HasManyAddAssociationMixin<User, number>;
  declare removeAssignee: HasManyRemoveAssociationMixin<User, number>;
  declare getUser: HasManyGetAssociationsMixin<Task>;
  @ForeignKey(() => Project)
  @Column
  projectId!: number

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => User)
  @Column
  assigneeId!: number;

  @BelongsTo(() => User)
  assignee!: User;

  @HasMany(() => Timer)
  timers!: Array<Timer>

  @Column
  description!: string;

  @Column({ defaultValue: null, allowNull: true })
  taskLink!: string;

  @Column({ defaultValue: 'Active' })
  status!: string;
}

export default Task;
