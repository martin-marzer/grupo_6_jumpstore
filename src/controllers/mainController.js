const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    index: (req,res) => {
        res.render("home");
    },
    carrito: (req,res) => {
        res.render("carrito");
    },
    search: (req, res) => {
		let searchUser = req.query.keywords;
		let finalSentence = searchUser.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toLowerCase());
		let usersResults = [];
		for (let i = 0; i < products.length; i++) {
			let nameNormal = products[i].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
			let nameNormalFinal = nameNormal.toLowerCase();
			if (nameNormalFinal.includes(finalSentence) && (finalSentence.length != 0) ) {
				usersResults.push(products[i]);
			}		
		}
		res.render("results", {
			searchUser: searchUser,
			usersResults, usersResults,
			toThousand: toThousand
		});
	},
};
module.exports = controlador;