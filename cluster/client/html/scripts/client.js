let currentProducts = [];
let totalPrice = 0;

$(document).ready(function() {
    function showError(selector) {
        selector.text("Erreur dans la creation du produit");
        selector.show();
        setTimeout(function() {
            selector.hide();
        }, 3000);
    }

    $('#spark-task').click(function(e) {
        $('.spark-text').hide();
        $('.spark-loading').show();
        $.get("http://localhost:3001/api/spark/frequent-products").done(function(res) {
            console.log(res);
            $('.spark-text').show();
            $('.spark-loading').hide();
            $('.spark-results').show();
        }).fail(function(err) {
            console.log(err);
            $('.spark-text').show();
            $('.spark-loading').hide();
            $('.spark-results').show();
        });  
    });

    $("#get-products").submit(function(e) {
        e.preventDefault()

        $("#products > tbody > tr").remove();

        $.getJSON("http://localhost:3000/api/products").done(function(res) {
            res.forEach(product => {
                $("#products > tbody").append("<tr><td>" + product.id +
                                                "</td><td>" + product.name +
                                                "</td><td>" + product.price +
                                                "$</td><td><button class='add-product'>+</button></tr>")
                $("#products").show();
            })
        })
    })

    $(document).on("click", ".add-product", function() {
        let id = parseInt($(this).parent().parent().children().first().text());
        let name = $(this).parent().parent().children().eq(1).text();
        let price = parseFloat($(this).parent().parent().children().eq(2).text());
        let exists = false;
        
        currentProducts.forEach(product => {
            if (product.id === id) {
                product.quantity++;
                exists = true;
            }
        });

        if (!exists) {
            currentProducts.push({id: id, name: name, price: price, quantity: 1});
        }

        $("#invoice-products > tbody > tr").remove();
        totalPrice = 0;
        currentProducts.forEach(product => {
            totalPrice += (product.price * product.quantity);
            $("#invoice-products > tbody").append("<tr><td>" + product.id +
                                            "</td><td>" + product.name +
                                            "</td><td>" + product.price + 
                                            "</td><td>" + product.quantity + 
                                            "</td><td>" + (product.price * product.quantity) + 
                                            "$</td><td><button class='remove-product'>x</button></tr>")
            $("#invoice-products").show();
        });

        if (currentProducts.length > 0) {
            $("#invoice-total").text("Total : " + totalPrice.toFixed(2) + "$");  
            $("#create-invoice").show();          
        }

    });        

    $(document).on("click", ".remove-product", function() {
        let id = parseInt($(this).parent().parent().children().first().text());
        for(let i = 0; i < currentProducts.length; i++){
            if(currentProducts[i].id === id)  {
                let toRemove = currentProducts[i].price * currentProducts[i].quantity;
                totalPrice -= toRemove;
                currentProducts.splice(i, 1);
            }
        }

        if (currentProducts.length > 0) {
            $("#invoice-total").text("Total : " + totalPrice.toFixed(2) + "$");  
            $("#create-invoice").show();                    
        } else {
            $("#invoice-products").hide();
            $("#create-invoice").hide();          
            $("#invoice-total").text("Aucun produit dans la facture.. Ajoute en !");            
        }
        $(this).parent().parent().remove();
    });

    $("#create-product").submit(function(e) {
        e.preventDefault();

        let productName = $("#product-name").val();
        let productPrice = parseInt($("#product-price").val());
        let productId = 0;

        $.get("http://localhost:3000/api/products").done(function(res) {
            res.forEach(product => {
                if (product.id > productId) {
                    productId = product.id;
                }
            });

            productId++;

            $.post("http://localhost:3000/api/products", {id: productId, name: productName, price: productPrice }).done(function(res) {
                $("#product-res").text(res);
                $("#product-res").show();
                $("#products > tbody").append("<tr><td>" + productId +
                                                "</td><td>" + productName +
                                                "</td><td>" + productPrice +
                                                "$</td><td><button class='add-product'>+</button></tr>");
                setTimeout(function() {
                    $("#product-res").hide();
                }, 3000);
            }).fail(function() {
                showError($("#product-res"));
            });
        }).fail(function() {
            showError($("#product-res"));
        });        
    });

    $("#create-invoice").submit(function(e) {
        e.preventDefault();
        
        let invoiceID = 0;

        $.get("http://localhost:3000/api/invoices").done(function(res) {
            res.forEach(invoice => {
                if (invoice.id > invoiceID) {
                    invoiceID = invoice.id;
                }
            });

            invoiceID++;

            let invoiceProducts = [];
            for(let i = 0; i < currentProducts.length; i++){
                invoiceProducts.push({id: currentProducts[i].id, quantity: currentProducts[i].quantity });
            }

            let jsonInvoiceProducts = JSON.stringify(invoiceProducts);
            
            $.post("http://localhost:3000/api/invoices", {id: invoiceID, products: jsonInvoiceProducts}).done(function(res) {
                $("#invoice-res").text(res);
                $("#invoice-res").show();
                
                let total = 0;
                $("#invoices > tbody").append("<tr><td><strong>" + invoiceID + "</strong></td>")
                for (let i = 0; i < currentProducts.length; i++) {
                    total += currentProducts[i].price * currentProducts[i].quantity
                    $("#invoices > tbody").append("<td>Nom : " + currentProducts[i].name + "<br />" +
                                                    "Prix unitaire: " + currentProducts[i].price + "<br />" +
                                                    "Quantité : " + currentProducts[i].quantity + "<br /><br /></td>")
                }
                $("#invoices > tbody").append("<td>" + total.toFixed(2) + "$</td></tr>")

                $("#invoice-products > tbody > tr").remove();
                $("#invoice-products").hide();
                $("#create-invoice").hide();          
                $("#invoice-total").text("Aucun produit dans la facture.. Ajoute en !");  

                setTimeout(function() {
                    $("#invoice-res").hide();
                }, 3000);      
            }).fail(function() {
                showError($("#invoice-res"));
            });            
        }).fail(function() {
            showError($("#invoice-res"));
        });        
    });

    $("#get-invoices").submit(function(e) {
        e.preventDefault()

        $("#invoices tr, #invoices td").remove();

        $.getJSON("http://localhost:3000/api/invoices").done(function(resInvoices) {
            $.getJSON("http://localhost:3000/api/products").done(function(resProducts) {
                resInvoices.forEach(invoice => {
                    let totalPrice = 0
                    let products = []
                    let invoiceProducts = []
                    invoice.products.forEach(invoiceProduct => {
                        resProducts.forEach(product => {
                            if (invoiceProduct.id === product.id) {
                                totalPrice += product.price * invoiceProduct.quantity
                                products.push(product)
                                invoiceProducts.push(invoiceProduct)
                            }
                        });
                    });
                    $("#invoices > tbody").append("<tr><td><strong>" + invoice.id + "</strong></td>")
                    for (let i = 0; i < products.length; i++) {
                        $("#invoices > tbody").append("<td>Nom : " + products[i].name + "<br />" +
                                                        "Prix unitaire: " + products[i].price + "<br />" +
                                                        "Quantité : " + invoiceProducts[i].quantity + "<br /><br /></td>")
                    }
                    $("#invoices > tbody").append("<td>" + totalPrice.toFixed(2) + "$</td></tr>")
                });
                $("#invoices").show();
            })
        })
    })

});
