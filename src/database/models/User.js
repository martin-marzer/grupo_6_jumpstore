module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        lastname: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        phone: {
            type: dataTypes.BIGINT(15),
            allowNull: true,
        },
        rol: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
         
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: "updatedAt",
        deletedAt: false
    }
    const User = sequelize.define(alias, cols, config);


    User.associate = function (models) {
        User.hasOne(models.Payment, {
            as: "payment",
            foreignKey: "userID",
            onDelete: 'cascade'
        })
        User.hasOne(models.Address, {
            as: "address",
            foreignKey: "userID",
            onDelete: 'cascade'
        })
    }



    return User
};