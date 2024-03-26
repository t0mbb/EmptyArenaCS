import account from '../models/account.model';
import * as _ from 'lodash';

export const listUser = async (req, res, next) => {
  try {
    const user = await account.find();

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const removeAccount = async (req, res, next) => {
  try {
    const user = req.user;
    await account.deleteOne(user);

    return res.json({
      message: 'Delete user successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const userAccount = new account(req.body);
    await userAccount.save();

    return res.json({
      message: 'Create user successfully',
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

export const findOneAccount = async (req, res, next) => {
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
