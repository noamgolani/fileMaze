/* eslint-disable no-console */
const verbuse = false;

export function logReq(req) {
  const { method, url, body } = req;

  // TODO add verbuse
  if (!verbuse) {
    console.log(`${method} Request to - ${url}`);
    if (body && Object.entries(body).length > 0) console.dir(body);
  }
}

export function logRes(res) {
  const { statusCode, statusMessage } = res;
  if (!verbuse) {
    console.log(`${statusCode} | ${statusMessage}`);
  }
  // TODO add verbuse
}

export function logError(err) {
  if (!verbuse) {
    console.err(err);
  } else console.log(`Error: ${err.message}`);
}
