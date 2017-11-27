const db = require('../models/index.js');

const getUserItems = userId => (
  db.Item.findAll({
    attributes: ['item', 'category'],
    where: { userId },
  })
);

const getTripItems = tripId => (
  db.TripItem.findAll({
    where: { tripId },
    include: [db.Item],
  })
);

const add = (tripInfo) => {
  const { item, category, quantity, packed, userId, tripId } = tripInfo;

  return db.Item.findOrCreate({ where: { item, category, userId } })
    .spread((newItem) => {
      const itemId = newItem.get('id');
      return db.TripItem.create({
        quantity,
        packed,
        itemId,
        tripId,
      });
    })
    .then(tripItem => tripItem.get());
};

const deleteTripItem = (tripItemId) => {
  db.TripItem.findById(tripItemId)
    .then(tripItem => tripItem.destroy());
};


  // db.Trip.update(
  //   { destination: 'Mexico City' },
  //   { where: { id: '099ef2ab-a05b-4a5d-b31e-ce6a3df19fb7' } },
  // );

// const newUser = () => {
//   db.Trip.create({
//     destination: 'London',
//     start_date: '2017-11-25',
//     end_date: '2018-01-13',
//     userId: '832b2ce1-edd7-4a93-9486-08a8be021ed4' })
//     .then((user) => {
//       console.log(user.get({
//         plain: true,
//       }));
//     });
// };

module.exports.getUserItems = getUserItems;
module.exports.getTripItems = getTripItems;
module.exports.add = add;
module.exports.deleteTripItem = deleteTripItem;
// module.exports.newUser = newUser;
