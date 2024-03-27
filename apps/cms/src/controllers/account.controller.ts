import { findOneAccount } from '../service/account.service';
import account from '../models/account.model';
import roleModel from '../models/role.model';
import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import mongoose from 'mongoose';

export const listAccount = async (req, res, next) => {
  try {
    const accounts = await account.find();
    return res.status(200).json({ accounts });
  } catch (err) {
    next(err);
  }
};
export const listRole = async (req, res, next) => {
  try {
    const role = await roleModel.find();
    return res.status(200).json({ role });
  } catch (err) {
    next(err);
  }
};

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

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = req.user;
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
    const { accountId } = req.params;
    const result = await account.findById({ _id: accountId });
    res.json({
      data: result,
      message: 'Account successfully found',
    });
  } catch (error) {
    next(error);
  }
};
