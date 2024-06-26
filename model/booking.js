import mongoose from "mongoose";
const { Schema } = mongoose;

const BOOKING_STATUS_PENDING = 1;
const BOOKING_STATUS_CONFIRMED = 2;
const BOOKING_STATUS_CANCELLED = 3;

const schema = new Schema({
    bar_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bar'
    },
    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    check_in_time: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
        default: null,
    },
    status: {
        type: Number,
        required: true,
        default: BOOKING_STATUS_PENDING,
    }
},
    { timestamps: true }
);

const model = mongoose.model("Booking", schema);
export const bookingModel = model;

//@Function
const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const newDocument = new model({
            bar_id: data.bar_id,
            table_id: data.table_id,
            user_id: data.user_id,
            check_in_time: data.check_in_time,
            time: data.time,
            price: data.price,
            discount_id: data.discount_id,
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

  const Booking = {
    create,
    findOne,
    find,
    deleteOne
  };
  export default Booking;