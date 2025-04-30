import mongoose from "mongoose";

export const handleNumber = (number, onError = 0) => {
  return isNaN(Number(number)) ? onError : number;
};

export const removeSpecificText = (str = "", textsToRemove = []) => {
  return str
    ?.split(",")
    ?.filter((item) => !textsToRemove.includes(item.trim()))
    ?.join(",");
};


export const isObjectId = (id = null) =>{
  if(!id) return false;
  try{
    return mongoose.Types.ObjectId.isValid(id?.toString());
  }catch(error){
    return false;
  }
}