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

    return User
};