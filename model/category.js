import mongoose from "mongoose";
const { Schema } = mongoose;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameURL:{
        type: String,
        required: true
    }
    // quantity: {
    //     type: Number,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // available: {
    //     type: Number,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true
    // },
},
    { timestamps: true }
);

const model = mongoose.model("Category", schema);
export const categoryModel = model;

const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
          name: data.name,
          nameURL: data.nameURL
        });
        newDocument
          .save()
          .then((createdDocument) => {
            resolve(createdDocument);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const findOne = (filter) => {
    return new Promise((resolve, reject) => {
        try{
            model
            .findOne({...filter})
            .then((document) => {
                resolve(document)
            })
            .catch((error) => {
                reject(error);
            });
        }catch(error){
            reject(error);
        }
    })
  }

  const find = (filter) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .find({ ...filter})
          .then((documents) => {
            resolve(documents);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteOne = (filter) => {
    return new Promise((resolve, reject) => {
      try {
        model
          .deleteOne(filter)
          .then((result) => {
            if (!result.deletedCount) {
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  const Categorys = {create, findOne, find, deleteOne};
  export default Categorys;