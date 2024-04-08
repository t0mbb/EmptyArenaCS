import pool_TableModel from '../models/pool_table.model';
import * as _ from 'lodash';

export const listPoolTable = async (req, res, next) => {
  try {
    const pool_Table = await pool_TableModel.find();
    return res.status(200).json({ pool_Table });
  } catch (err) {
    next(err);
  }
};


export const createPoolTable = async (req, res, next) => {
  try {
    const pool_Table = new pool_TableModel(req.body);
    await pool_Table.save();

    return res.json({
      message: 'New table pool has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updatePoolTable = async (req, res, next) => {
  try {
    const pool_TableId = req.params.pool_TableId;
    const data = req.body.values;
    await pool_TableModel.updateOne( {_id : pool_TableId},data);
    return res.json({
      message: 'Update Table successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removePoolTable = async (req, res, next) => {
  try {
    const pool_TableId = req.params.pool_TableId;
    await pool_TableModel.deleteOne({_id : pool_TableId});
    return res.json({
      message: 'Delete Table successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findPoolTable = async (req, res, next) => {
  try {
    const { pool_TableId } = req.params;
    const result = await pool_TableModel.findById({ _id: pool_TableId });
    res.json({
      Result : result,
      message: 'Table successfully found',
    });
  } catch (error) {
    next(error);
  }
};