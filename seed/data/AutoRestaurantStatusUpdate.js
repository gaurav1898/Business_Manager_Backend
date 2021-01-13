const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const UserService = require('../../services/UserService');
const config = require('config')
const Token = require('../../handler/genToken');
const roleList = require('../Roles');
const Email = require('../../handler/email');
const RestaurantService = require('../../services/RestaurantService')
exports.StatusUpdate = (req, res, next) => {
    console.log("changing restaurant update");
    RestaurantService.GetAll((err, data)=>{
        let restaurantList = data

        if(typeof array != "undefined" && array != null && array.length != null && array.length > 0){
        console.log(restaurantList.length)
            for(let i=0; i<restaurantList.length; i++){
                // console.log(restaurantList[i].user_id.status)
                if(restaurantList[i].user_id.status == "InActive" || restaurantList[i].user_id.status == "DeActivate"){
                    RestaurantService.updateUserStatus(restaurantList[i]._id, "InActive", (err, info)=>{
    
                    })
                }
            }
        }

    })

}
