mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhcmFqNzIiLCJhIjoiY2xreHF4M2RuMDNzcDNqcXU1azdwYnI4bCJ9.MHqRiRsVLWxVysoCPQp2ng';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)