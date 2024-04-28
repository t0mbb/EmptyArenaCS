import orderModel from '../models/orders.model';
import orderItemModel from '../models/order_items.model';
import * as _ from 'lodash';
import productModel from '../models/product.model';

export const listOrder = async (req, res, next) => {
  try {
    const { tableId} = req.params
    const order = await orderModel.findOne({pool_table_id : tableId});
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
    const orderItem = await orderItemModel.find({pool_table_id : req.params.tableId}).populate('product_id');
    return res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};


export const createOrderItem = async (req, res, next) => {
  try {
    const orderItem = new orderItemModel(req.body);
    const product = await productModel.findById({_id : req.body.product_id} )
    if(req.body.quantity > product.quantity_in_stock) {
      return res.status(400).json({
        message : " error , its not enough stock"
      })
    }
    const left = product.quantity_in_stock - req.body.quantity ;
    await product.updateOne({ quantity_in_stock : left})
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

    const product = await productModel.findById({_id : req.body.product_id} )
    if(req.body.quantity > product.quantity_in_stock) {
      return res.status(400).json({
        message : " error , its not enough stock"
      })
    }
    const left = product.quantity_in_stock - req.body.quantity ;
    await product.updateOne({ quantity_in_stock : left})

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
  
    const orderItem : any = await orderItemModel.findOne({_id : orderItemId}).populate('product_id');
    const left = orderItem.product_id.quantity_in_stock + orderItem.quantity ;
    const product = productModel.findById(orderItem.product_id._id);
    await product.updateOne({quantity_in_stock : left})

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