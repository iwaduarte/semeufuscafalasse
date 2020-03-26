module.exports = (sequelize, DataType) => {
    const Leaderboard = sequelize.define('leaderboard',{
        points: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        underscored: true,
    });

    Leaderboard.associate = models => Leaderboard.belongsTo(models.user);

    return Leaderboard;
};