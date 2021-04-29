// Accounts' Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');

const AccountSchema = new Schema (
{
	username : String,
	password : String,
	email : {
		type : String,
		default : 'exmaple@email.com'
	},
	createdAt : {
		type : Date,
		default : Date.now
	},
	token : {
		type : String,
		default : uuidv4()
	}
});



module.exports = {
	Account : mongoose.model('Account', AccountSchema),
};