var github = document.getElementById('github-fetch');
github.addEventListener('click', async function () {
  // fetch('http://localhost:116/auth/signin', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     formFields: [
  //       {
  //         id: 'email',
  //         value: email,
  //       },
  //       { id: 'password', value: pass },
  //     ],
  //   }),
  // })
  //   .then((response) => console.log(response))
  //   .catch((err) => console.log(err));
});

var email = document.getElementById('sign-in__submit-button');
email.addEventListener('click', async function () {
  console.log('logging in');

  const email = document.getElementById('sign-in-email').value;
  const pass = document.getElementById('sign-in-pass').value;
  console.log(email, pass);

  fetch('http://localhost:116/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        { id: 'password', value: pass },
      ],
    }),
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});
