module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        createdAt: {
            type: dataTypes.DATE
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        stockID: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        brandID: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } 
         
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.hasMany(models.ImagesProduct, {
            as: "images",
            foreignKey: "productsID"
        })
        Product.belongsTo(models.Stock, {
            as: "stocks",
            foreignKey: "stockID"
        })
        Product.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brandID"
        })
        Product.belongsTo(models.Discount, {
            as: "discounts",
            foreignKey: "discountID"
        })
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "sizesproducts",
            foreignKey: "productID",
            otherKey: "sizeID",
            timestamps: false
        })



        // Movie.belongsTo(models.Genre, { // models.Genre -> Genres es el valor de alias en genres.js
        //     as: "genre",
        //     foreignKey: "genre_id"
        // })


    //     Movie.belongsToMany(models.Actor, { // models.Actor -> Actors es el valor de alias en actor.js
    //         as: "actors",
    //         through: 'actor_movie',
    //         foreignKey: 'movie_id',
    //         otherKey: 'actor_id',
    //         timestamps: false
    //     })
    }

    return Product
};