// Тут поиск
const btn_search = document.getElementById('search-form__submit-btn');
btn_search.addEventListener('click', async (event) => {
  event.preventDefault();
  const form = document.forms.namedItem('search-available-homes');
  const form_data = new FormData(form);
  const object = {};
  form_data.forEach((value, key) => {
    if (key === 'max_guests' || key === 'max_child') {
      object[key] = Number(value);
    } else if (
      (key === 'city' && !value) ||
      (key === 'date_start' && !value) ||
      (key === 'date_end' && !value)
    ) {
      event.preventDefault();
      console.log('Enter data');
    } else {
      object[key] = value;
    }
  });
  const raw = JSON.stringify(object);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    'http://127.0.0.1:116/accommodation/available',
    requestOptions,
  )
    .then((response) => response.json())
    .then((response) => {
      console.log('OK:', JSON.stringify(response));
      localStorage.setItem('av-homes', JSON.stringify(response));
      window.postMessage(
        JSON.stringify(response),
        'http://localhost:116/search',
      );
    })
    .catch((error) => console.log('NOT OK', error));

  let search_window = window.open('https://web-bb.herokuapp.com/search');
});
