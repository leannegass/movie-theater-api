const Show = require('./Show')
const User = require('./User')

//one to many association
User.hasMany(Show)
Show.belongsTo(User)


// async function find(id) {
//     // Write queries here
//     const order = await Order.findByPk(id);
//     const payments = await order.getPayments();
//     return payments;  
// }



// async function addShow(userId, show) {
//     // find the user record
//     const user = await User.findOne({ where: { id: userId } });
//     // create the project
//     show.setUser(user);
// };
// const show = {
//     "title": "King of Queens",
//     "genre": "Drama",
//     "rating": 5,
//     "status": "on-going"
//   }
// addShow(1, show);


module.exports = {
    Show, 
    User
}
