# graph-deploy

GitHub action that deploys a subgraph to the graph protocol to index Ethereum and IPFS as graphql

Set your thegraph.com access token as a github secret in your repository, and add `.github/workflows/graph.yml`:

```yml
name: Deploy Graph

on:
  push:
    branches: main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install node
        uses: actions/setup-node@v1
        with:
          node-version: 14
      - name: Install
        run: yarn --frozen-lockfile
      - name: Codegen
        run: yarn codegen
      - name: Build
        run: yarn build
      - uses: gtaschuk/graph-deploy@v0.1.0
        with:
          graph_access_token: ${{secrets.GRAPH_ACCESS_TOKEN}}
          graph_subgraph_name: "your-subgraph-name"
          graph_account: "your-github-name-or-organization"
          graph_config_file: "subgraph.yml"
```
