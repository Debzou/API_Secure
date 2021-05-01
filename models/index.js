const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** 
 * This schema will be used for stocking user in database
 * @schema : Account
 */
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


// export module
module.exports = {
	Account : mongoose.model('Account', AccountSchema),
};