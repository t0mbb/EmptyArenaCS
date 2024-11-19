import { findOneAccount } from '../../service/account.service';
import account from '../../models/account/account.model';
import rankModel from '../../models/account/rank.model';

import bcrypt from 'bcrypt';
import * as _ from 'lodash';



export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existAccount = await findOneAccount({ email });
    const unrank : any = await rankModel.findOne({name : "UNRANK"});
    console.log(unrank._id);
    
    if (existAccount) {
      return res.status(400).json({
        message: "Account existed",
      });
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    req.body.password = hash;
    
    const userAccount = new account({
      email : req.body.email ,
      password : hash,
      fullname : req.body.fullname,
      dob : req.body.dob,
      role : "guest",
      gender : req.body.gender,
      address : req.body.address,
      phone : req.body.phone,
      rankID : unrank._id});
    await userAccount.save();

    return res.json({
      message: 'Create Account successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const rePassUser = async (req, res, next) => {
  try {
    const {userId}  = req.params;
    const existAccount = await findOneAccount({ _id : userId });
    if(existAccount)
      {
        const saltRounds = 10;
        const pass = req.body.password;
        const hash = bcrypt.hashSync(pass, saltRounds);
        req.body.password = hash;
        await account.updateOne({ _id: userId }, {
          password : hash
        });
    
        return res.json({
          message: 'Update Password successfully',
        });
      }
     

      return res.status(400).json({
        message: "Not Found",
      });
  
  } catch (err) {
    next(err);
  }
};


export const listAccount = async (req, res, next) => {
  try {
    const accounts = await account.find()
    
    return res.status(200).json({ accounts });
  } catch (err) {
    next(err);
  }
};

export const checkToken = (req, res , next) =>{
  res.status(200).json({message : "token is valid"});
}



export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = req.body.values;
    await account.updateOne({ _id: userId }, {
      email : user.email,
      fullname : user.fullname,
      dob : user.dob,
      gender : user.gender,
      address : user.address,
      phone : user.phone,
      roleID : user.roleID,
      rankID : user.rankID
    });
    
    return res.json({
      message: 'Update Account successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeAccount = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await account.deleteOne({ _id: userId });
    return res.json({
      message: 'Delete Account successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await account.findOne({ _id: userId }).populate('rankID')
    res.json({
      Result: result,
      message: 'Account successfully found',
    });
  } catch (error) {
    next(error);
  }
};
