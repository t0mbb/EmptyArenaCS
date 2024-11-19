
import matchModel from '../../models/match/match.model';

import * as _ from 'lodash';

import scheduleModel from '../../models/match/schedule.model';
import notificationModel from '../../models/match/notification.model';
import { createNoti, listAcc } from '../../service/matching.service';
import { sendMail } from '../../service/sendMail.service';
import accountModel from '../../models/account/account.model';
import pendingModel from '../../models/match/pending.model';



export const createSchedule = async (req, res, next) => {
  try {
   const schedule = await scheduleModel.create({accHostID : req.body.accId1, oppoAccID : req.body.accId2 , time : req.body.time , date : req.body.date});
   await createNoti(schedule._id , req.body.accId1);
   await createNoti(schedule._id , req.body.accId2);
   
   await sendMail(req.body.accID2.email);
   
   return res.json({
      message: 'Schedule has been created successfully',
    });
    
  } catch (err) {
    next(err);
  }
};

export const listHostSchedule = async ( req , res , next) => { 
  try {
  const {accountId} = req.params;
  const listSchedule = await scheduleModel.find({accHostID : accountId});
  return res.json({listSchedule});
  }
  catch (err) {
    next(err);
  }
};

export const listOppoSchedule = async ( req, res , next) => {
  try {
    const {accountId} = req.params;
    const listSchedule = await scheduleModel.find({oppoAccID : accountId});
    return res.json({listSchedule});
    }
    catch (err) {
      next(err);
    }
}



export const cancelSchedule = async (req , res , next) =>{
  try {
   const {scheduleId} = req.params;
   await scheduleModel.deleteOne({_id : scheduleId});
    }
    catch (err) {
      next(err);
    }
};
export const confirmSchedule = async( req , res , next) => {  
  await pendingModel.create({Player1ID : req.body.accId1 , Player2ID : req.body.accId2 , time : req.body.time , date : req.body.date});

  return res.json({
    message : "Pending has been confirmed"
  })
}

export const listOppoments = async (req , res , next ) => {
  try { 
    const {accId} = req.params;
  const accHost : any = await accountModel.findOne({_id : accId}).populate("rankID");
  const listOppo =  await listAcc(accHost.rankID.name);
  return res.json({
    message : "list Oppoments has been found",
    listOppo : listOppo
  })
  }
  catch(err) {
    next(err);
  }  
}

export const updateSchedule = async (req, res, next) => {
  try {
    const {scheduleId} = req.params;
    const scheduleUpdate = req.body.values;
    delete scheduleUpdate._id;
    await matchModel.updateOne( {_id : scheduleId},scheduleUpdate);

    return res.json({
      message: 'Schedule has been updated successfully',
    });
  } catch (error) {
    next(error);
  }
};


