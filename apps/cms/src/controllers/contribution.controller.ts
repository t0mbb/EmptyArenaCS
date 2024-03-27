import contributionModel from '../models/contribution.model';
import * as _ from 'lodash';

export const listContribution = async (req, res, next) => {
  try {
    const contribution = await contributionModel.find();
    return res.status(200).json({ contribution });
  } catch (err) {
    next(err);
  }
};


export const createContribution = async (req, res, next) => {
  try {
    const contribution = new contributionModel(req.body);
    await contribution.save();

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
