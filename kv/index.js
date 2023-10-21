module.exports = async ({ github, context, core, fetch }) => {
  const { ORG, URL } = process.env;
  const audience = `https://oidc.bcj.io/${ORG}`;

  const token = await core.getIDToken(audience);
  const response = await fetch(URL+"/api/v0/variables", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json();

  if (!response.ok) {
    return core.setFailed(body);
  }

  for (let { key, sensitive, value, envvar } of body.variables) {
    if (sensitive) {
      core.setSecret(value);
    }

    core.exportVariable(envvar, value);

    core.info(`Set env ${envvar} to ${key} (sensitive=${sensitive})`);
  }
};
