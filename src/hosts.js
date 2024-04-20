const local = "http://localhost:8000/v1"
const prod = "https://octoone.azurewebsites.net/v1"

const host = process.env.NODE_ENV === 'development' ? local : prod;
// const host = local;


export { host };