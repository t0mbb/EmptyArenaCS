import account from "../../models/account/account.model";
import rankModel from "../../models/account/rank.model";


//update theo list 
export const updateRankDaily = async (req,res,next) => {
    try {
      const { userId} = req.params;
      const user = await account.findById({_id : userId});
      
      const check = await rankModel.findOne({min_elo : {$lte : user.elo} , max_elo : {$lte : user.elo}})
  
      if(check) { user.rankID = check._id;}
      else { next();}
  
      res.json({
        message: 'Update Rank successfully'
      })
  
    }
    catch (error) {
      next(error);
    }
  }
export const createRank = async (req, res ,next) => {
    try {
        const newRank = new rankModel(req.body);
        await newRank.save();
        return res.json({message :" Rank has been created successfully"})
    }
    catch(error)
    {
        next(error);
    }
}
export const updateRank = async (req, res ,next) => {
    try {
        const rankId = req.params.rankId;
        const rankUpdate = req.body.values;
        delete rankUpdate._id;
        await rankModel.updateOne( {_id : rankId},rankUpdate);
    
        return res.json({
          message: 'Rank has been Update  successfully',
        });
      } catch (error) {
        next(error);
      }
}
export const findRank = async (req , res ,next ) =>{
    try {
        const rankId = req.params.rankId;
        const rank = await rankModel.findOne({_id : rankId});
        return res.json({
            result : rank,
            message : "Rank has been found"
        })
    }
    catch(error) { 
      next(error);
    }
}

export const listRank = async (req , res ,next ) =>{
  try {
      const rank = await rankModel.find();
      return res.json({
          result : rank,
          message : "Rank has been found"
      })
  }
  catch(error) { 
    next(error);
  }
}