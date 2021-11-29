module.exports = (sequelize, dataTypes) => {
    let alias = 'Payment'; // esto debería estar en singular
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
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        expiry: {
            type: dataTypes.STRING(7),
            allowNull: false
        },
        card: {
            type: dataTypes.BIGINT(16),
            allowNull: false
        },
        dni: {
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
    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = function (models) {
        Payment.belongsTo(models.User, {
            as: "user",
            foreignKey: "userID",
            onDelete: 'cascade'
        })

    }

    return Payment
};