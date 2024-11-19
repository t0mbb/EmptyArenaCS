// viet button add : tim account nguoi dang dung qua session -> add vao listqueueonline 
import { TypeTournaments } from '../../models/tournaments/tournaments.model';
import tourModel from '../../models/tournaments/tournaments.model'
import { generateRounds } from '../../service/tour.service';
import { addTour } from '../../service/tour.service';
import roundsModel from '../../models/tournaments/rounds.model';
import bracketsModel from '../../models/tournaments/brackets.model';
export const createTour = async (req, res, next) => {
  try {
    const newTour = req.body;
    const tour : any = await addTour(newTour);
    if(tour.type === TypeTournaments.Single)
      {
        const rounds = await generateRounds(req.body.totalmember);
        for (const round of rounds) {
          for(const match of round){
             await new roundsModel(match).save();
          }
        }
      }
    else if (tour.type === TypeTournaments.Double)
      {
        
      }
    else {return res.json("Not correct Type Tournaments")}
    return 
 
  }
  catch(err){next(err)}};

  export const updateTour = async (req, res, next) => {
    try {
      const tourId = req.params.tourId;
      const tourUpdate = req.body.values;
      delete tourUpdate._id;
      await tourModel.updateOne( {_id : tourId},tourUpdate);
  
      return res.json({
        message: 'Tournaments has been updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  
  
  export const removeTour = async (req, res, next) => {
    try {
      const tourId = req.params.tourId;
      await tourModel.deleteOne({ _id: tourId });
      return res.json({
        message: 'Tournaments has been deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  };
  export const findTour = async (req, res, next) => {
    try {
      const { tourId } = req.params;
      const result = await tourModel.findById({ _id: tourId })
      res.json({
        Result : result,
        message: 'Tournaments successfully found',
      });
    } catch (error) {
      next(error);
    }
  };