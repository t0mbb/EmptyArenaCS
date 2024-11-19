import { TypeTournaments } from '../../models/tournaments/tournaments.model';
import tourModel from '../../models/tournaments/tournaments.model'
import { addBracket, generateRounds, listQueue } from '../../service/tour.service';
import { addTour } from '../../service/tour.service';
import roundsModel from '../../models/tournaments/rounds.model';
import bracketsModel from '../../models/tournaments/brackets.model';
import queuetourModel from '../../models/tournaments/queuetour.model';
import accountModel from '../../models/account/account.model';
import { listAcc } from '../../service/matching.service';
export const testing = async (req, res, next) => {
  try {
    const {accId} = req.params;
  const accHost : any = await accountModel.findOne({_id : accId}).populate("rankID");
  const listOppo = await listAcc(accHost.rankID.name);
  return res.json({
    message : "list Oppoments has been found",
    listOppo : listOppo
  })
  }
  catch(err){next(err)}};
// export const testing1 = async (req, res, next) => {
//   try {
//     const newTour = req.body;
//     const tour : any = await addTour(newTour);  
//     const brackets = await addBracket(newTour, tour.tourId);
//     ///split , player join tour and then owner of club will run 

//     //joining
//     const jointour = await queuetourModel.create({
//       accountId : req.body.accountId,
//       tourId : req.params.tourId
//     });
//     return res.json({
//       message : "player has join"
//     });
//     // send accountId from body in frontend

//     const tourId = req.params;
//     const listPlayer = await listQueue(tourId);
    
//     // viết hàm player bấm join sẽ vào listPlayer
//     console.log(brackets);
//     if(tour.type === TypeTournaments.Single)
//       {
//         const rounds = await generateRounds(req.body.totalmember);
//         console.log(rounds);
//         for (const round of rounds) {
//           for(const match of round){
//              await new roundsModel({ match ,bracketsId : brackets._id}).save();
//           }
//         }
//       }
//     else if (tour.type === TypeTournaments.Double)
//       {
       
//       }
//     else {return res.json("Not correct Type Tournaments")}
//     return res.json({message : "done"});
//   }
//   catch(err){next(err)}};