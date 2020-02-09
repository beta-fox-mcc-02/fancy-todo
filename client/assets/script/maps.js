function initMap(loc) {
  let map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: loc,
    zoom: 16
    // mapTypeId: 'satellite'
  });
  const marker = new google.maps.Marker({ position: loc, map: map });
}