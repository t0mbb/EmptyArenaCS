import queueModel from '../models/match/queue.model';
import accountModel, { PopolatedAccount } from '../models/account/account.model'
import notificationModel from '../models/match/notification.model';
import { Ranking } from '../models/account/rank.model';
 export function getRandomPair(max) {
    const index1 = Math.floor(Math.random() * max);
    let index2;
    do {
      index2 = Math.floor(Math.random() * max);
    } while (index2 === index1);
    return [index1, index2];
  }

export async function addingList (accId) {
        const exist = await queueModel.findOne({accountId : accId})
        if(exist) {
            return ({
                message : "This Account has in list queue"
            })
        }
        await queueModel.create({accountId : accId});
        return ({
          message : "successful adding in list queue"
        })
}

  export function checkAccount(id) {
   const check = accountModel.findOne(id);
   if(check)
    {
      return true;
    }
    return false;
  }

  export async function listAcc(ranking : Ranking){
    const listAll : PopolatedAccount[] = await accountModel.find().populate("rankID");
  
    if (ranking === Ranking.LvlG || ranking === Ranking.LvlH) {
      const filteredAccounts = listAll.filter(account =>
        [Ranking.LvlF, Ranking.LvlG, Ranking.LvlH].includes(account.rankID.name as Ranking)
    );
    
      return filteredAccounts;}
    else if (ranking === Ranking.LvlE || ranking === Ranking.LvlF ) {
      const filteredAccounts = listAll.filter(account =>
        [Ranking.LvlD, Ranking.LvlF, Ranking.LvlE].includes(account.rankID.name as Ranking)
    );
      return filteredAccounts;}
  else if (ranking === Ranking.LvlD ) {
    const filteredAccounts = listAll.filter(account =>
      [Ranking.LvlC, Ranking.LvlD, Ranking.LvlE].includes(account.rankID.name as Ranking)
  );
    return filteredAccounts;}
else if (ranking === Ranking.LvlC ) {
  const filteredAccounts = listAll.filter(account =>
    [Ranking.LvlC, Ranking.LvlD, Ranking.LvlB].includes(account.rankID.name as Ranking)
)
  return filteredAccounts;}
else if (ranking === Ranking.LvlB ) {
  const filteredAccounts = listAll.filter(account =>
    [Ranking.LvlC, Ranking.LvlA, Ranking.LvlB].includes(account.rankID.name as Ranking)
)
return filteredAccounts;}

else if (ranking === Ranking.LvlA ) {
  const filteredAccounts = listAll.filter(account =>
    [Ranking.LvlC, Ranking.LvlA, Ranking.LvlB].includes(account.rankID.name as Ranking)
)
return filteredAccounts;}
else if (ranking === Ranking.LvlPRO ) {
  const filteredAccounts = listAll.filter(account =>
    [Ranking.LvlC, Ranking.LvlA, Ranking.LvlB , Ranking.LvlPRO].includes(account.rankID.name as Ranking)
)
return filteredAccounts;
}}


  export function createNoti (scheId , accId) {
    notificationModel.create({accountID : accId , scheduleID : scheId});
    return ({
      message : "new notification has been added"
    })
}
  

 