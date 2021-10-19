/* eslint-disable no-console */
const verbuse = false;

export function logReq(req) {
  const { method, url, body } = req;

  if (!verbuse) {
    console.log(`${method} Request to - ${url}`);
    if (body && Object.entries(body).length > 0) console.dir(body);
  }
}

export function logRes(res) {
  const { statusCode, statusMessage, body } = res;
  if (!verbuse) {
    console.log(`${statusCode} | ${statusMessage}`);
    if (body && Object.entries(body).length > 0) console.dir(body);
  }
}
