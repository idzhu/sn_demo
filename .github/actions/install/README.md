# ServiceNow CI/CD GitHub Action for Install Application

Installs the specified application from the application repository onto the local instance.

# Usage
## Step 1: Prepare values for setting up your variables for Actions
- credentials (username and password for a service account)
- instance URLs for your dev, test, prod, etc. environments
- sys_id or scope for your app
- sys_id for your ATF Test Suite

## Step 2: Configure Secrets in your GitHub repository
On GitHub, go in your repository settings, click on the secret _Secrets_ and create a new secret.

Create secrets called 
- `SNOW_USERNAME`
- `SNOW_PASSWORD`
- `SNOW_INSTALL_INSTANCE` only the **domain** string is required from the instance URL, for example https://**domain**.service-now.com
- `APP_SYS_ID` or `APP_SCOPE`

## Step 3: Example Workflow Template
https://github.com/ServiceNow/sncicd_githubworkflow

## Step 4: Configure the GitHub Action if need to adapt for your needs or workflows
```yaml
- name: Install Application 
  id: sncicd-install-app # id of the step
  uses: ServiceNow/sncicd-install-app # like username/repo-name
  with:
    version: ${{steps.publish_app.outputs.newVersion}}
  env:
    snowUsername: ${{ secrets.SNOW_USERNAME }}
    snowPassword: ${{ secrets.SNOW_PASSWORD }}
    snowInstallInstance: ${{ secrets.SNOW_INSTALL_INSTANCE }}
    appSysID: ${{ secrets.APP_SYS_ID }}
    appScope: ${{ secrets.APP_SCOPE }}
```
Inputs:
- **version** - Application version to install. Takes the version from the publish application step. steps._**publish_app**_.outputs.newVersion is an id of the step
    
Outputs:
- **rollbackVersion** - The previously installed version.
    
Environment variable should be set up in the Step 1
- snowUsername - Username to ServiceNow instance
- snowPassword - Password to ServiceNow instance
- snowInstallInstance - ServiceNow instance where application will be installed
- appSysID - Required if app_scope is not specified. The sys_id of the application
- appScope - Required if app_sys_id is not specified. The scope name of the application, such as x_aah_custom_app

# Contributing

## Tests

Tests should be ran via npm commands:

#### Unit tests
```shell script
npm run test
```   

#### Integration test
```shell script
npm run integration
```   

## Build

```shell script
npm run buid
```

## Formatting and Linting
```shell script
npm run format
npm run lint
```

# Notices

## Support Model

ServiceNow built this integration with the intent to help customers get started faster in adopting CI/CD APIs for DevOps workflows, but __will not be providing formal support__. This integration is therefore considered "use at your own risk", and will rely on the open-source community to help drive fixes and feature enhancements via Issues. Occasionally, ServiceNow may choose to contribute to the open-source project to help address the highest priority Issues, and will do our best to keep the integrations updated with the latest API changes shipped with family releases. This is a good opportunity for our customers and community developers to step up and help drive iteration and improvement on these open-source integrations for everyone's benefit. 

## Governance Model

Initially, ServiceNow product management and engineering representatives will own governance of these integrations to ensure consistency with roadmap direction. In the longer term, we hope that contributors from customers and our community developers will help to guide prioritization and maintenance of these integrations. At that point, this governance model can be updated to reflect a broader pool of contributors and maintainers. 
