$(document).ready(function () {
  $.get('http://localhost:5001/api/v1/status/',
    function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  const amenList = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenList[$(this).attr('data-id')];
    }
    let text = Object.values(amenList).join(', ');
    if (text.length > 37) {
      text = text.slice(0, 37) + '...';
    }
    if (text) {
      $('.amenities > h4').text(text);
    } else {
      $('.amenities > h4').text('\xa0');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (response) {
      const places = response;
      const $placesSection = $('section.places');
      $placesSection.empty(); // Clear any existing places

      places.forEach(function (place) {
        const $article = $('<article>');
        const $titleBox = $('<div>').addClass('title_box');
        const $title = $('<h2>').text(place.name);
        const $priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
        const $information = $('<div>').addClass('information');
        const $maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        const $numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
        const $numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
        // var $user = $("<div>").addClass("user").html("<b>Owner:</b> " + place.user.first_name + " " + place.user.last_name);
        const $description = $('<div>').addClass('description').html(place.description);

        $titleBox.append($title);
        $titleBox.append($priceByNight);
        $information.append($maxGuest);
        $information.append($numberRooms);
        $information.append($numberBathrooms);
        $article.append($titleBox);
        $article.append($information);
        // $article.append($user);
        $article.append($description);
        $placesSection.append($article);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error: ' + errorThrown);
    }
  });

  $('button').click(function () {
    const amenList = {};
    $('input[type="checkbox"]:checked').each(function () {
      amenList[$(this).attr('data-id')] = $(this).attr('data-name');
    });
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenList) }),
      success: function (response) {
        const places = response;
        const $placesSection = $('section.places');
        $placesSection.empty(); // Clear any existing places

        places.forEach(function (place) {
          const $article = $('<article>');
          const $titleBox = $('<div>').addClass('title_box');
          const $title = $('<h2>').text(place.name);
          const $priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
          const $information = $('<div>').addClass('information');
          const $maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
          const $numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
          const $numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
          // var $user = $("<div>").addClass("user").html("<b>Owner:</b> " + place.user.first_name + " " + place.user.last_name);
          const $description = $('<div>').addClass('description').html(place.description);

          $titleBox.append($title);
          $titleBox.append($priceByNight);
          $information.append($maxGuest);
          $information.append($numberRooms);
          $information.append($numberBathrooms);
          $article.append($titleBox);
          $article.append($information);
          // $article.append($user);
          $article.append($description);
          $placesSection.append($article);
        });
      }
    });
  });
});
