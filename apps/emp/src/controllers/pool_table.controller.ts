import orderItemModel from '../models/order_items.model';
import ordersModel from '../models/orders.model';
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

export const startService = async (req, res, next) => {
  try {
    const { pool_TableId} = req.params;

    await pool_TableModel.updateOne( {_id : pool_TableId},{
      status : 'used'
    });
    const start = new ordersModel({
      pool_table_id : pool_TableId,
      start_time : Date.now()
    })
    await start.save();
    res.json({
      data : start
    });
  } catch (error) {
    next(error);
  }
};

export const stopService = async (req, res, next) => {
  try {
    const idTable = req.params.pool_TableId;
    const data : any = await ordersModel.findOne({pool_table_id : idTable}).populate('pool_table_id')
    const orderItem : any = await orderItemModel.find({pool_table_id : idTable}).populate('product_id');
  

    if(data.start_time === "null")
    {
      return res.json({
        message: 'Table didnt start yet',
      });
    }
    const startTime : any = data.start_time;
    const endTime = new Date().toISOString();

    const start= Date.parse(startTime); 
    const end= Date.parse(endTime); 
    
    const price = data.pool_table_id.price;
    const hours = (end - start) / (1000 * 60 * 60)

    let totalItem = 0 ;
    orderItem.forEach(item => {
      totalItem += item.quantity * item.product_id.price; 
    }) 

    const totalCost = (end - start) / (1000 * 60 * 60) * price + totalItem;
   
    res.json({
      startTime : startTime,
      endTime : endTime,
      pricePerHour : price,
      totalItemCost : totalItem,
      tableNumber : data.pool_table_id.number,
      orderItem : orderItem,
      hours : Number(hours.toFixed(3)),
      totalCost : Number(totalCost.toFixed(2)),
    });  
   
    await pool_TableModel.updateOne( {_id : idTable},{
      status : "available"
    });
    await ordersModel.deleteOne( {_id : data._id});
    if(orderItem){
      await orderItemModel.deleteMany({ pool_table_id: idTable });
    }
  } catch (error) {
    next(error);
  }
};

