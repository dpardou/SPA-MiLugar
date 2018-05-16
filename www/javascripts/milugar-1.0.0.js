// Properties.

var props = {
    accuracy: 0,
    current_page: null,
    is_logged_in: null,
    latitude: 0,
    longitude: 0,
    map: null,
    pointer: null,
}

var parkingIcon = L.icon({
  iconUrl: './images/parking.png',
  iconSize: [48, 48]
})

var carIcon = L.icon({
  iconUrl: './images/leaflet-1.3.1/marker-icon.png',
  iconSize: [25, 41]
})
// Geolocation.

watcher = navigator.geolocation.watchPosition(function (pos) {
    props.accuracy = pos.coords.accuracy
    props.latitude = pos.coords.latitude
    props.longitude = pos.coords.longitude

    if (props.map !== null) {
        props.map.setView([props.latitude, props.longitude], 16)
        if (props.pointer != null) props.map.removeLayer(props.pointer)
        props.pointer = L.marker([props.latitude, props.longitude], {icon: carIcon}).addTo(props.map).bindPopup("<table><tr><th>latitud</th><td>" + props.latitude + "</td></tr><tr><th>longitud</th><td>" + props.longitude + "</td></tr></table>")
    }
})

// Page loaders.

var loaders = {
    "#page-loading": function () {
      setTimeout(function () {
        loadPage("#page-index")
      }, 3000)
    },
    "#page-index": function () {

    },
    "#page-login": function () {

    },
    "#page-register": function () {

    },
    "#page-forgot": function () {

    },
    "#page-report": function () {
        $("#denuncia-coordenadas-x").val(props.latitude)
        $("#denuncia-coordenadas-y").val(props.longitude)
    },
    "#page-map": function () {
        if (props.map == null) {
            props.map = L.map('map')
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(props.map);
            props.map.setView([props.latitude, props.longitude], 16);

            $.get("http://138.197.183.209/estacionamientos", function(data) {
                $(data).each(function(k, v) {
                    L.marker([v.latitud, v.longitud], { icon: parkingIcon }).addTo(props.map).bindPopup("<p>" + v.calle + " " + v.numero + "<br/><strong>Cantidad:</strong> " + v.cantidad + " estacionamiento(s).</p>")
                })
            }, "json")
        }
        if (props.pointer !== null) props.map.removeLayer(props.pointer)
        props.pointer = L.marker([props.latitude, props.longitude]).addTo(props.map).bindPopup()
    }
}

// Page loading method.

var loadPage = function (page) {
    $("body").data("current_page", page)
    $(".page-active").removeClass("page-active")
    $(page).addClass("page-active")
    loaders[page]()
}

// Initialize.

var initialize = function () {
    loadPage("#page-loading")
}

// Call initialize when the document has been fully loaded.

$(document).ready(function () {
    initialize()
})

// General events.

var click_hrefs = function (event) {
    var page = $(this).data("href")
    loadPage(page)
}

$(document).on("click touchstart", "[data-href]", click_hrefs)

// Specific events.

click_login_button = function (event) {
    var form = $("#form-login").serialize()
    var is_valid = true
    console.log(form)

    if (is_valid) {
        loadPage("#page-map")
    } else {
        alert("Nombre de usuario o contraseña incorrectos.")
    }
}
// prueba colapsar el menu
$(document).ready(function(){
	$(".cerrarMenu").click(function () {
			$('.navbar-toggle').click();
	});
});

$('.avbarSupportedContent').collapse()

$("#form-report-button").on("click tap", function(event) {
    event.preventDefault();

    var variables = $("#form-report").serialize();
    $.post("http://138.197.183.209/denuncias", variables, function () {
        alert("Gracias por contactarnos. Hemos registrado su denuncia correctamente.")
        loadPage("#page-map")
    }, "json")
    console.log(variables);
})

$("#form-contact-button").on("click tap", function(event) {
    event.preventDefault();

    var variables = $("#form-contact").serialize();
    $.post("http://138.197.183.209/contactos", variables, function () {
        alert("Gracias por contactarnos. Le enviaremos un correo electrónico a la brevedad")
        loadPage("#page-map")
    }, "json")
    console.log(variables);
})

$("#form-registration-button").on("click tap", function(event) {
    event.preventDefault();

    var variables = $("#form-registration").serialize();
    $.post("http://138.197.183.209/usuarios", variables, function () {
        alert("Gracias por registrarse. Le enviaremos un correo electrónico a la brevedad confirmando su registro")
        loadPage("#page-map")
    }, "json")
    console.log(variables);
})
