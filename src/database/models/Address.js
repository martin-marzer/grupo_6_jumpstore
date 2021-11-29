module.exports = (sequelize, dataTypes) => {
    let alias = 'Address'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userID: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        city: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        province: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        postal_code: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: "updatedAt",
        deletedAt: false
    }
    const Address = sequelize.define(alias, cols, config);

    Address.associate = function (models) {
        Address.belongsTo(models.User, {
            as: "user",
            foreignKey: "userID",
            onDelete: 'cascade'
        })

    }

    return Address
};