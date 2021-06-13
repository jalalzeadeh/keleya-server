import {
  Table,
  Column,
  Model,
  HasMany,
  IsUUID,
  PrimaryKey,
  Unique,
  Default,
  AutoIncrement,
  BeforeCreate, BeforeSave, BeforeUpdate
} from 'sequelize-typescript'
import {Col} from "sequelize/types/lib/utils";
import {DataTypes} from "sequelize";
import * as jwt from 'jsonwebtoken';
import *  as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';

@Table({
  underscored: true,

})
export class User extends Model {

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: sequelize.INTEGER
  })
  id: string

  @Column({
    allowNull: false,
    unique: true
  })
  email: string

  @Column({
    allowNull: false
  })
  password: string;

  @Column({
    allowNull: true
  })
  name: string;

  
  @Column({
    type: DataTypes.DATEONLY,
    allowNull: true
  })
  babyBirthDate: string

  @Default(false)
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: true
  })
  onBoardingDone: boolean

  @Default(false)
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: true
  })
  acceptedPrivacyPolicy: boolean;

  @Default(false)
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: true
  })
  acceptedTermsAndConditions: boolean


  @BeforeSave
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      user.set('password', await bcrypt.hash(user.password, 8));
    }
  }

  toJSON(): object {
   // const obj: any = this.toJSON();
   // delete obj.password;
   const obj: any = super.toJSON() ;
   delete obj.password;
   return obj;
   // return obj;

  }

  generateToken() {
    return jwt.sign({
      id: this.id,
      email: this.email
    }, 'secret')
  }

}


