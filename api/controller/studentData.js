const mongoose = require('mongoose');
const path = require('path');
const csv = require('csvtojson');

const Students = require('../models/student');
const { statusCodes, Messages } = require("../constant/index");


exports.uploadCsv = async (req,res,next)=>{
    try {
        
        const jsonArray = await csv().fromFile(req.file.path);
         await Students.insertMany(jsonArray);
        res.status(200).json({
          msg: Messages.DATA_STORE,
        });
    } catch (error) {
        next(error);
    }
}

exports.insertRow = async (req,res,next)=>{
    try {
        
        const newRowOject = req.body;
        newRowOject.phonenumber = Number(req.body.phonenumber);
        newRowOject.rollnumber = Number(req.body.rollnumber);
        const data = await Students.create(newRowOject);
        res.status(statusCodes.OK).json({
            newData:data
        });
    } catch (error) {
        next(error)
    }
}

exports.getData = async (req,res,next)=>{
    try {
        const data = await Students.find().limit(3);
        res.status(statusCodes.OK).json({
            Data:data
        })   
    } catch (error) {
        next(error)
    }
}


exports.getDataByRoll = async (req,res,next)=>{
    try {
        const data = await Students.findOne({rollnumber:req.params.rollnumber});
        
        if(!data){
            return res.status(statusCodes.BAD_REQUEST).json({
              messages: Messages.STUDENT_NOT,
            });
        }

        res.status(statusCodes.OK).json({
            student:data
        })

    } catch (error) {
        next(error)
    }
}


exports.updateStudent = async(req,res,next)=>{
    try {
        await Students.findOneAndUpdate(
          { rollnumber: req.params.rollnumber },
          req.body
        );

        res.status(statusCodes.OK).json({
          messages: Messages.STUDENT_UP,
        });


    } catch (error) {
        next(error);
    }
}


exports.deleteByRoll = async (req,res,next)=>{
    try {
        await Students.deleteOne({rollnumber:req.params.rollnumber});
        res.status(statusCodes.OK).json({
            messages:Messages.STUDENT_DEL
        })
    } catch (error) {
        next(error)
    }
}