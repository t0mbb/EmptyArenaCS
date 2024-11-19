import queueModel from '../../models/match/queue.model';
import matchModel from '../../models/match/match.model';
import accountModel from '../../models/account/account.model'
import {getRandomPair} from '../../service/matching.service'
import * as _ from 'lodash';
import { checkAccount } from '../../service/matching.service';



export const createMatch = async (req, res, next) => {
  try {
    const qCount = await queueModel.countDocuments();
    if (qCount < 2)
      {
        return res.status(400).json({
          message : "Not enough users to create pairs.!!!"
        });
      }
      
    const [index1 , index2] = getRandomPair(qCount);
    const user1 = await queueModel.findOne().skip(index1);
    const user2 = await queueModel.findOne().skip(index2);
    const match = new matchModel({
      accountId1 : user1.accountId,
      accountId2 : user2.accountId,
      daytime : new Date()});
    await match.save();
    await queueModel.deleteMany({ accountId: { $in: [user1.accountId, user2.accountId] } });
    
    return res.json({
      message: 'New Match has been created',
      match : match._id
    });

  } catch (err) {
    next(err);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const matchId = req.params.matchId;
    const matchUpdate = req.body.values;
    delete matchUpdate._id;
    await matchModel.updateOne( {_id : matchId},matchUpdate);

    return res.json({
      message: 'Match has been updated successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const removeMatch = async (req, res, next) => {
  try {
    const matchId = req.params.matchId;
    await matchModel.deleteOne({ _id: matchId });
    return res.json({
      message: 'Match has been deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
export const findMatch = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const result = await matchModel.findById({ _id: matchId }).populate('account_id');
    res.json({
      Result : result,
      message: 'Match successfully found',
    });
  } catch (error) {
    next(error);
  }
};

export const winMatch = async (req , res, next ) =>{
  try {
    const {matchId} = req.params;
    
  }
  catch(error){
    next(error);
  }
}
export const loseMatch = async (req , res , next ) => {
  try{
    
  }
  catch(error){

  }
}
