import contributionModel from '../models/contribution.model';
import { RoleName } from '../models/role.model';
import { getRoleID } from '../service/account.service';
import accountModel from '../models/account.model';
import * as _ from 'lodash';
import { sendMail } from '../service/sendMail.service';
export const listContribution = async (_req, res, next) => {
  try {
    const contribution = await contributionModel.find();
    return res.status(200).json({ contribution });
  } catch (err) {
    next(err);
  }
};

export const createContribution = async (req, res, next) => {
  try {
    const currentDate = new Date(req.body.closure_date);
    currentDate.setDate(currentDate.getDate() + 14);
    const contribution = new contributionModel({
      account_id: req.user._id,
      faculty_id: req.user.faculty_id,
      upload_date: Date.now(),
      closure_date: req.body.closure_date,
      finalclosure_date: req.body.finalclosure_date ?? currentDate,
      status: req.body.status,
    });
    await contribution.save();
    const roleID = await getRoleID(RoleName.MARKETING_COORDINATOR);
    const accountFound = await accountModel.findOne({
      role_id: roleID._id,
      faculty_id: req.user.faculty_id,
    });
    await sendMail(accountFound.email);
    return res.json({
      message: 'New Contribution has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updateContribution = async (req, res, next) => {
  try {
    const conId = req.params.conId;
    const conT = req.body.contribution[0];
    await contributionModel.updateOne({ _id: conId }, conT);

    return res.json({
      message: 'Update Contribution successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeContribution = async (req, res, next) => {
  try {
    const conId = req.params.conId;
    await contributionModel.deleteOne({ _id: conId });
    return res.json({
      message: 'Delete contribution successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findContribution = async (req, res, next) => {
  try {
    const { conId } = req.params;
    const result = await contributionModel.findById({ _id: conId });
    res.json({
      data: result,
      message: 'Contribution successfully found',
    });
  } catch (error) {
    next(error);
  }
};
