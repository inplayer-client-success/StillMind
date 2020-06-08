var config = {
    packages: [
        "95783",
    ],
    service_url: "https://services.inplayer.com"
}

$(function () {

    $('.inplayer-paywall-logout').hide();

    paywall.on('authenticated', function () {
        $('.inplayer-paywall-login').parent().hide();
        $('.inplayer-paywall-logout').parent().show();
    });

    paywall.on('logout', function () {
        location.reload();
    });


    function createItemElement(assetId, assetPhoto, assetTitle) {
        var output =
            `<div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"><a href="./item.html?id=${assetId}" class="overlay-link"></a></div><div class="item-label"><div class="name">${assetTitle}</div></div></div>`;

        return output;
    }


    config.packages.forEach((package, i) => {
        $.get(config.service_url + "/items/packages/" + package, response => {
            // console.log(response.id)
            var packageTitle = response.title;

            $("#package-title-" + package).html(packageTitle);

            $.get(
                config.service_url + "/items/packages/" + package + "/items?limit=500",
                response => {
                    // console.log($('#package-title-' + package))

                    var output = "";

                    for (var i = 0; i < response.collection.length; i++) {
                        var asset = response.collection[i];
                        // console.log(asset.title)

                        var assetId = asset.id;
                        var assetPhoto = asset.metahash.paywall_cover_photo;
                        var assetTitle = asset.title;
                        output += createItemElement(assetId, assetPhoto, assetTitle);

                        document.getElementById(
                            "package-items-" + package
                        ).innerHTML = output;
                    } // for
                }
            ); // get items
        }); // get packages
    }); //for each
})