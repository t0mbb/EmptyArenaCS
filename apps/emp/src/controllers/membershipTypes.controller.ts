import memberTypeModel from '../models/membership_types.model';
import membershipCardModel from '../models/membershipCards.model'
import * as _ from 'lodash';

export const listMemberType = async (req, res, next) => {
  try {
    const memberType = await memberTypeModel.find();
    return res.status(200).json({ memberType });
  } catch (err) {
    next(err);
  }
};


export const createMemberType = async (req, res, next) => {
  try {
    const memberType = new memberTypeModel(req.body);
    await memberType.save();

    return res.json({
      message: 'New memberType has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updateMemberType = async (req, res, next) => {
  try {
    const memTypeId = req.params.memTypeId;
    const memberType = req.body.values;
    delete memberType._id;
    await memberTypeModel.updateOne( {_id : memTypeId},memberType);

    return res.json({
      message: 'Update memberType successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeMemberType = async (req, res, next) => {
  try {
    const memTypeId = req.params.memTypeId;
    const membershipCardList = await membershipCardModel.find({membership_type_id : memTypeId});
    if(membershipCardList){
      return res.status(400).json({
        error: 'This type of membership is still used in the Membership Card',
      });
    }else{
    await memberTypeModel.deleteOne({_id : memTypeId});
    return res.json({
      message: 'Delete MemberType successfully',
    });
  }
  } catch (err) {
    next(err);
  }
};

export const findMemberType = async (req, res, next) => {
  try {
    const { memTypeId } = req.params;
    const result = await memberTypeModel.findById({ _id: memTypeId });
    res.json({
      Result : result,
      message: 'MemberType successfully found',
    });
  } catch (error) {
    next(error);
  }
};
