// Accounts' Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	}
});



module.exports = {
	Account : mongoose.model('Account', AccountSchema),
};