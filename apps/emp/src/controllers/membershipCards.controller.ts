import membershipCardModel from '../models/membershipCards.model';
import * as _ from 'lodash';

export const listMemberCard = async (req, res, next) => {
  try {
    const memTypeId = req.params.memTypeId;
    const membershipCardList = await membershipCardModel.find({membership_type_id : memTypeId}).populate('account_id');
    return res.status(200).json({ membershipCardList });
  } catch (err) {
    next(err);
  }
};


export const createMemberCard = async (req, res, next) => {
  try {
    const member = new membershipCardModel(req.body);
    await member.save();

    return res.json({
      message: 'New MemberCard has been added',
    });
  } catch (err) {
    next(err);
  }
};
export const updateMemberCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const memberCardUpdate = req.body.values;
    delete memberCardUpdate._id;
    await membershipCardModel.updateOne( {_id : cardId},memberCardUpdate);

    return res.json({
      message: 'Update memberCard successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const removeMemberCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    await membershipCardModel.deleteOne({ _id: cardId });
    return res.json({
      message: 'Delete MemberCard successfully',
    });
  } catch (err) {
    next(err);
  }
};
export const findMemberCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const result = await membershipCardModel.findById({ _id: cardId }).populate('account_id').populate('membership_type_id');
    res.json({
      Result : result,
      message: 'MemberCard successfully found',
    });
  } catch (error) {
    next(error);
  }
};