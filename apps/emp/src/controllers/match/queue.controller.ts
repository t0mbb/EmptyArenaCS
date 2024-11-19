import queueModel from "../../models/match/queue.model";
import { addingList } from "../../service/matching.service";
import { getRandomPair } from "../../service/matching.service";
import matchModel from "../../models/match/match.model";

export const createQueue = async (req, res, next) => {
    try {
      const accId = req.body.accountId;
      await addingList(accId);
        const qCount = await queueModel.countDocuments();
        if (qCount >= 2)
          {
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
          }
        else {
          return res.json({
            message : "Wait for others opponents... "
          })
        }
    } catch (err) {
      next(err);
    }
  };
  export const updateQueue = async (req, res, next) => {
    try {
      const listId = req.params.listId;
      const listUpdate = req.body.values;
      delete listUpdate._id;
      await queueModel.updateOne( {_id : listId},listUpdate);
  
      return res.json({
        message: 'Tournaments has been updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteQueue = async (req, res ,next) => {
    try {
        const listId = req.params.listId;
        await queueModel.deleteOne({_id : listId});
        return res.json({
            message: 'successfully',
          });
    }
    catch(error) {
        next(error);
    }
  }