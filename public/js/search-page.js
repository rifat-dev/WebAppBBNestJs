// window.addEventListener('message', receiveMessage, false);
//
// function receiveMessage(event) {
//   console.log('Меня вызвали receiveMessage');
//   if (event.origin !== 'http://localhost:116') return;
//   console.log(event);
// }

let av_homes = JSON.parse(localStorage.getItem('av-homes'));
console.log(av_homes);
// localStorage.removeItem('av-homes');

let search_page__items_list = document.getElementsByClassName(
  'search-page__items-list',
);

for (let i = 0; i < av_homes.length; i++) {
  console.log(av_homes[i].description);
  var accommodation_item = document.createElement('div');
  var accommodation_item__galleria = document.createElement('div');
  var accommodation_item__info = document.createElement('div');
  var accommodation_item__type = document.createElement('div');
  var accommodation_item__title = document.createElement('div');
  var accommodation_item__line = document.createElement('div');
  var accommodation_item__people = document.createElement('div');
  var accommodation_item__location = document.createElement('div');
  var accommodation_item__numbers = document.createElement('div');
  var accommodation_item__rating = document.createElement('div');
  var accommodation_item__cost = document.createElement('div');
  var accommodation_item__type_p = document.createElement('p');
  var accommodation_item__title_p = document.createElement('p');
  var accommodation_item__people_p = document.createElement('p');
  var accommodation_item__location_p = document.createElement('p');
  var accommodation_item__rating_p = document.createElement('p');
  var accommodation_item__cost_p = document.createElement('p');
  var accommodation_item__galleria_img = document.createElement('img');
  var accommodation_item__rating_i = document.createElement('i');

  accommodation_item.className = 'accommodation-item';
  accommodation_item__galleria.className = 'accommodation-item__galleria';
  accommodation_item__info.className = 'accommodation-item__info';
  accommodation_item__type.className = 'accommodation-item__type';
  accommodation_item__title.className = 'accommodation-item__title';
  accommodation_item__line.className = 'accommodation-item__line';
  accommodation_item__people.className = 'accommodation-item__people';
  accommodation_item__location.className = 'accommodation-item__location';
  accommodation_item__numbers.className = 'accommodation-item__numbers';
  accommodation_item__rating.className = 'accommodation-item__rating';
  accommodation_item__cost.className = 'accommodation-item__cost';
  accommodation_item__rating_i.className = 'fa fa-star';

  accommodation_item__type_p.textContent = av_homes[i].type_accommodation;
  accommodation_item__title_p.textContent = av_homes[i].title;
  accommodation_item__people_p.textContent =
    'Взрослых: ' + av_homes[i].max_guests + '. Детей: ' + av_homes[i].max_child;
  accommodation_item__location_p.textContent =
    av_homes[i].location['city'] + ' ' + av_homes[i].location['street'];
  accommodation_item__rating_p.textContent = av_homes[i].rating;
  accommodation_item__cost_p.textContent = av_homes[i].cost_night + '$';
  accommodation_item__galleria_img.src = '/img/im5.jpg.webp';

  accommodation_item__galleria.appendChild(accommodation_item__galleria_img);
  accommodation_item__type.appendChild(accommodation_item__type_p);
  accommodation_item__info.appendChild(accommodation_item__type);
  accommodation_item__title.appendChild(accommodation_item__title_p);
  accommodation_item__people.appendChild(accommodation_item__people_p);
  accommodation_item__location.appendChild(accommodation_item__location_p);
  accommodation_item__rating.appendChild(accommodation_item__rating_i);
  accommodation_item__rating.appendChild(accommodation_item__rating_p);
  accommodation_item__numbers.appendChild(accommodation_item__rating);
  accommodation_item__cost.appendChild(accommodation_item__cost_p);
  accommodation_item__numbers.appendChild(accommodation_item__cost);
  accommodation_item__info.appendChild(accommodation_item__title);
  accommodation_item__info.appendChild(accommodation_item__line);
  accommodation_item__info.appendChild(accommodation_item__people);
  accommodation_item__info.appendChild(accommodation_item__location);
  accommodation_item__info.appendChild(accommodation_item__numbers);
  accommodation_item.appendChild(accommodation_item__galleria);
  accommodation_item.appendChild(accommodation_item__info);

  search_page__items_list[0].appendChild(accommodation_item);
}
