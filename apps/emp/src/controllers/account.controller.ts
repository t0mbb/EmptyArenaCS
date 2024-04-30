import { findOneAccount } from '../service/account.service';
import account from '../models/account.model';

import bcrypt from 'bcrypt';
import * as _ from 'lodash';



export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existAccount = await findOneAccount({ email });

    if (existAccount) {
      return res.status(400).json({
        message: "Account existed",
      });
    }
    
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    req.body.password = hash;
    
    const userAccount = new account(req.body);
    await userAccount.save();

    return res.json({
      message: 'Create Account successfully',
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
    delete user._id;
    await account.updateOne({ _id: userId }, user);
    
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
    const result = await account.findOne({ _id: userId })
    res.json({
      Result: result,
      message: 'Account successfully found',
    });
  } catch (error) {
    next(error);
  }
};