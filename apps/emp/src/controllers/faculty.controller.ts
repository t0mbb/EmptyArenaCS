import facultyModel from '../models/faculty.model';
import * as _ from 'lodash';

export const listFaculty = async (req, res, next) => {
  try {
    const faculty = await facultyModel.find();
    return res.status(200).json({ faculty });
  } catch (err) {
    next(err);
  }
};

export const createFaculty = async (req, res, next) => {
  try {
    const faculty = new facultyModel(req.body);
    await faculty.save();

    return res.json({
      message: 'New Faculty has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updateFaculty = async (req, res, next) => {
  try {
    const facultyUpdate = req.body.faculty[0];
    await facultyModel.updateOne(facultyUpdate);

    return res.json({
      message: 'Update Faculty successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeFaculty = async (req, res, next) => {
  try {
    const facId = req.params.falId;
    await facultyModel.deleteOne({ facId });
    return res.json({
      message: 'Delete Faculty successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findFaculty = async (req, res, next) => {
  try {
    const { facId } = req.params;
    const result = await facultyModel.findById({ _id: facId });
    res.json({
      data: result,
      message: 'Faculty successfully found',
    });
  } catch (error) {
    next(error);
  }
};
