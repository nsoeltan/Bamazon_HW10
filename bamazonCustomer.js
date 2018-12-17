var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    // run the "displayInventory" function after the connection is made to display the table
    displayInventory();
});


var displayInventory = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Product ID", "Product Name", "Category", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        bamazonPrompt();
    });
}

// function which prompts the user for what action they should take
function bamazonPrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Hello Bamazoner! What would you like to purchase? Please enter the Product ID.",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many items would you like to order?",
            filter: Number
        },

    ]).then(function (answers) {
        var productId = answers.ID;

        var productQuantity = answers.Quantity;

        updateProducts(productId, productQuantity)
    });
}

function updateProducts(productId, productQuantity) {
    connection.query('SELECT * FROM products', function (error, res) {
        if (error) throw error;
        var items;
        
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == productId) {
                items = res[i]
            }
        }

        if (items.stock_quantity >= productQuantity) {
            status(items, productId, productQuantity)
            console.log("Bamazoner...your order is complete! Thank you for shopping with us.")
            connection.end()

        } else {
            console.log("Sorry, at the moment we do not have sufficient items in stock to complete this order.")
            connection.end()
        }
    })
};
function status(Obj, productId, productQuantity) {
    var updatedProdQ = Obj.stock_quantity - productQuantity;

    var query = "UPDATE products SET stock_quantity = ? where ?";

    connection.query(query, [updatedProdQ, { item_id: productId }], function (error, res) {
    })

}












