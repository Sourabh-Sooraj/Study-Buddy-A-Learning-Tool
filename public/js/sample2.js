const settings = {
    "async": true,
    "crossDomain": true,
    "contentType": 'application/json;charset=UTF-8',
    "url": "https://api.unsplash.com/photos/random/?client_id=Jvb_zosMenH0KBg3ukhA3CoHDXl1aycwBQY9LGCS2GU&orientation=landscape&query=study",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    $('body').css(`background-image`,`url(${response.urls.regular})`);
  });