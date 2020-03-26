module.exports = (sequelize, DataType) => {

    const User = sequelize.define('user', {

            name: {
                type: DataType.STRING,
                allowNull: false,
            },
            email: {
                type: DataType.STRING,
                allowNull: false,
            }

        },
        {
            underscored: true
        });

    User.associate = models => {

        User.hasMany(models.leaderboard)
    };

    return User;
};