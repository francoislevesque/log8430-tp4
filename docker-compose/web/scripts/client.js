let currentProducts = [];

$(document).ready(function() {
    function showError() {
        $("#product-res").text("Erreur dans la creation du produit");
        $("#product-res").show();
        setTimeout(function() {
            $("#product-res").hide();
        }, 3000);
    }

    $("#get-products").submit(function(e) {
        e.preventDefault()

        $.getJSON("http://log8430-tp4.witify.io/api/products").done(function(res) {
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
        currentProducts.push(id);
    })
    
    $("#create-product").submit(function(e) {
        e.preventDefault();

        let productName = $("#product-name").val();
        let productPrice = parseInt($("#product-price").val());
        let productId = 0;

        $.get("http://log8430-tp4.witify.io/api/products").done(function(res) {
            res.forEach(product => {
                if (product.id > productId) {
                    productId = product.id;
                }
            });

            productId++;

            $.post("http://log8430-tp4.witify.io/api/products", {id: productId, name: productName, price: productPrice }).done(function(res) {
                $("#product-res").text(res);
                $("#product-res").show();
                setTimeout(function() {
                    $("#product-res").hide();
                }, 3000);
            }).fail(function() {
                showError();
            });
        }).fail(function() {
            showError();
        });        
    });
});
