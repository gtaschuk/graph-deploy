const core = require("@actions/core");
const { execSync } = require("child_process");

(async () => {
  let authCmd = `node_modules/.bin/graph auth https://api.thegraph.com/deploy/${core.getInput('graph_access_token')}`
  let deployCmd = `node_modules/.bin/graph deploy ${core.getInput('graph_account')}/${core.getInput('graph_subgraph_name')} ${core.getInput('graph_config_file')} --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/`

  try {
    console.log("Authenticating with access token...")
    execSync(authCmd)
    console.log("Deploying to graph protocol...")
    execSync(deployCmd)

    core.setOutput(
      "status",
      "Successfully deployed subgraph"
    );
  } catch (err) {

    core.setFailed(err.toString());
    //core.setOutput(
      //"status",
      //"Subgraph deploy skipped - nothing to update"
    //);
  }
})();
