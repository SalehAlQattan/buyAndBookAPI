module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Booking;
};
