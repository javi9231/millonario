let misCabeceras = new Headers();
const userData = {
  "user": "millonario",
  "password": "cfer46lf"
};
let miInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData),
};
export default function token() {
  fetch('https://gameserver.centic.ovh/auth/login', miInit)
    .then(response => response.json())
    .then(response => console.log(response));
}
