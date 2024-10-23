const { EZOIDC_TOKEN, EZOIDC_HOST, AUDIENCE } = process.env;

module.exports = async function ({ core }) {
  const token = EZOIDC_TOKEN || (await core.getIDToken(AUDIENCE)),
    baseURL = EZOIDC_HOST || AUDIENCE,
    headers = { Authorization: `Bearer ${token}` },
    response = await fetch(`${baseURL}/ezoidc/1.0/variables`, { headers }),
    body = await response.json();

  if (response.status !== 200) {
    core.error(body.reason);
    core.error(body.error);
    process.exit(1);
    return;
  }

  for (let variable of body.variables) {
    if (variable.value?.string === undefined) {
      core.warning(`variable ${variable.name} has no value`);
      continue
    }

    if (variable.redact !== false) {
      core.setSecret(variable.value.string);
    }

    if (variable.export) {
      core.exportVariable(variable.export, variable.value.string);
      core.info(`exported ${variable.name} as ${variable.export}`);
    }
  }

  if (body.variables.length == 0) {
    core.warning("no variables were allowed");
  }
};
