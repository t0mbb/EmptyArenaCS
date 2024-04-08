import orderModel from '../models/orders.model';
import orderItemModel from '../models/order_items.model';
import * as _ from 'lodash';

export const listOrder = async (req, res, next) => {
  try {
    const order = await orderModel.find();
    return res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};


export const createOrder = async (req, res, next) => {
  try {
    const order = new orderModel(req.body);
    await order.save();

    return res.json({
      message: 'New Orders has been added',
    });
  } catch (err) {
    next(err);
  }
};
export const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const orderUpdate = req.body;
    delete orderUpdate._id;
    await orderModel.updateOne( {_id : orderId},orderUpdate);

    return res.json({
      message: 'Update Orders successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const removeOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await orderModel.deleteOne({ _id: orderId });
    return res.json({
      message: 'Delete orders successfully',
    });
  } catch (err) {
    next(err);
  }
};
export const findOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const result = await orderModel.findOne({ _id: orderId });
    res.json({
      Result: result,
      message: 'Account successfully found',
    });
  } catch (error) {
    next(error);
  }
};


export const listOrderItem = async (req, res, next) => {
  try {
    const orderItem = await orderItemModel.find();
    return res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};


export const createOrderItem = async (req, res, next) => {
  try {
    const orderItem = new orderItemModel(req.body);
    await orderItem.save();

    return res.json({
      message: 'New orderItem has been added',
    });
  } catch (err) {
    next(err);
  }
};
export const updateOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId;
    const orderUpdate = req.body;
    delete orderUpdate._id;
    await orderModel.updateOne( {_id : orderItemId},orderUpdate);

    return res.json({
      message: 'Update Orders successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const removeOrderItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId;
    await orderItemModel.deleteOne({ _id: orderItemId });
    return res.json({
      message: 'Delete orderItems successfully',
    });
  } catch (err) {
    next(err);
  }
};
export const findOrderItem = async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    const result = await orderModel.findOne({ _id: orderItemId });
    res.json({
      Result: result,
      message: 'Account successfully found',
    });
  } catch (error) {
    next(error);
  }
};