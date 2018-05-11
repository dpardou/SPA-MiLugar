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

// Geolocation.

watcher = navigator.geolocation.watchPosition(function (pos) {
    props.accuracy = pos.coords.accuracy
    props.latitude = pos.coords.latitude
    props.longitude = pos.coords.longitude

    if (props.map !== null) {
        props.map.setView([props.latitude, props.longitude], 13)
        if (props.pointer != null) props.map.removeLayer(props.pointer)
        props.pointer = L.marker([props.latitude, props.longitude]).addTo(props.map).bindPopup()
    }
})

// Page loaders.

var loaders = {
    "#page-loading": function () {
      setTimeout(function () {
        loadPage("#page-login")
      }, 3000)
    },
    "#page-login": function () {

    },
    "#page-register": function () {

    },
    "#page-forgot": function () {

    },
    "#page-map": function () {
        if (props.map == null) {
            props.map = L.map('map').setView([props.latitude, props.longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(props.map);
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

$(document).on("click touchstart", "#form-login-button", click_login_button)
