import productModel from '../models/product.model';
import categoryModel from '../models/category.model';
import * as _ from 'lodash';

export const listProduct = async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    const product = await productModel.find({category_id : categoryId});
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};


export const createProduct = async (req, res, next) => {
  try {
    const product = new productModel(req.body);
    await product.save();

    return res.json({
      message: 'New product has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = req.body.values;
    delete product._id;
    await productModel.updateOne( {_id : productId},product);

    return res.json({
      message: 'Update product successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await productModel.deleteOne({_id : productId});
    return res.json({
      message: 'Delete Product successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await productModel.findById({ _id: productId });
    res.json({
      Result : result,
      message: 'Product successfully found',
    });
  } catch (error) {
    next(error);
  }
};


export const findProductById = async (req, res, next) => {
  try {
    const { catId } = req.params;
    const result = await productModel.find({ category_id: catId });
    res.json({
      Result : result,
      message: 'Product successfully found',
    });
  } catch (error) {
    next(error);
  }
};


export const listCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find();
    return res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};
export const createCategory = async (req, res, next) => {
    try {
      const category = new categoryModel(req.body);
      await category.save();
  
      return res.json({
        message: 'New category has been added',
      });
    } catch (err) {
      next(err);
    }
  };

  export const updateCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const category = req.body.values;
      delete category._id;
      await categoryModel.updateOne( {_id : categoryId},category);
  
      return res.json({
        message: 'Update category successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  export const findCategory = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const result = await categoryModel.findById({ _id: categoryId });
      res.json({
        Result : result,
        message: 'Category successfully found',
      });
    } catch (error) {
      next(error);
    }
  };
  export const removeCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const check = await productModel.findOne({category_id : categoryId});
      if(!check){
        await categoryModel.deleteOne({_id : categoryId});
      return res.json({
        message: 'Delete Category successfully',
      });
      }
      else {
        return res.json({
          message: 'These are still product in Category',
        });
      }
      
    } catch (err) {
      next(err);
    }
  };