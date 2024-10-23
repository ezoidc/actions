# GitHub Actions for ezoidc

## `ezoidc/actions/env`

Set environment variables in a workflow job from an ezoidc server. By default, the action will request a token from the GitHub OIDC provider using the provided `audience`. For example:

```yaml
- uses: ezoidc/actions/env@v1
  with:
    audience: https://test.ezoidc.dev
```

If a token was already created, it can be provided with the `token` input or `EZOIDC_TOKEN` environment variable.

```yaml
- uses: ezoidc/actions/env@v1
  with:
    token: ${{ env.EZOIDC_TOKEN }}
```

If the audience is not a valid URL that can be reached by the workflow, the address of the server can be overridden with the `host` input or `EZOIDC_HOST` environment variable.

```yaml
- uses: ezoidc/actions/env@v1
  with:
    audience: cluster.local
    host: https://test.ezoidc.dev
```

### Inputs

| Name | Description | Default |
| --- | --- | --- |
| `audience` | The token's audience | `""` |
| `token` | An existing token to use for authentication | `""`|
| `host` | Override the address of the server | `""` |
