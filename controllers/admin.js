const Product = require('../models/product');
const db=require('../util/database').getDataBaseName;
const mongodb=require('mongodb');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findById(prodId)
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.getData=(req,res,next)=>{

let name=req.query.name;
if(name){
  let database=db();
  let myResposeArray=[];
  console.log('in here')
  // the new mongo db is used to make sure that the _id goes in the form of a BSON format.
  database.collection('companies').find({_id:new mongodb.ObjectID(name)}).next().then((response)=>res.status(200).json(response)).catch((err)=>{
    console.log(err)
  })

.catch((err)=>{
  res.status(400).json({message:'some error ocurred',err:err});
  
})
    
   
     
  


      

}else{
  res.status(403).json({status:403,message:'you need to put name'})
}

 

}


exports.test =(req, res, next) =>{
  console.log(req.query.name)

  let name=req.query.name;
     if(name){
    let database=db();
    database.collection('companies').insertOne({name:name})
    .then((response)=>{
      res.status(200).json({message:'data add was done',data:response})
    })
    .catch(()=>{
      res.status(400).json({message:'there seems to be an error'})
    })
  }else{
    res.status(403).send({message:'you must add a name'})
  }

}
 