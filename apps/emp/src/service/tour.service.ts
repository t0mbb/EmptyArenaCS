import bracketsModel from '../models/tournaments/brackets.model';
import tourModel from '../models/tournaments/tournaments.model'
import queuetourModel from '../models/tournaments/queuetour.model';
export function generateRounds(numPlayers){
    const rounds = [];
    let currentRound = [];
    
    // Create initial matches
    for (let i = 1; i <= numPlayers; i += 2) {
      currentRound.push([i, i + 1]);
    }
    rounds.push(currentRound);
  
    // Generate subsequent rounds
    while (currentRound.length > 1) {
      const nextRound = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        nextRound.push([currentRound[i], currentRound[i + 1]]);
      }
      rounds.push(nextRound);
      currentRound = nextRound;
    }
  
    return rounds;
  }

  export async function addTour(data){
    if(data.totalmember === 16 || 32 || 64)
        {
            const newTour = new tourModel({
                name: data.name,
                details : data.details,
                time : Date.now(),
                totalmember : data.totalmember,
                type : data.type,
            })
            await newTour.save();
            return newTour;
        }
    return console.log("Total member not correct");
  }
  export async function addBracket(data , id) {
    const newBracket = new bracketsModel({
      tourId : id,
      roundId : data.roundId,
      totalmember : data.totalmember
    })
    await newBracket.save();
  
    return newBracket;
  }
  export async function listQueue(tour_id) {
    const listPlayer = await queuetourModel.find({tourId : tour_id})
    return listPlayer;
  }
