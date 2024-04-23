const local = "http://localhost:8000/v1"
const prod = "https://octoone.azurewebsites.net/v1"

let host = process.env.NODE_ENV === 'development' ? local : prod;
host = prod;


export { host };