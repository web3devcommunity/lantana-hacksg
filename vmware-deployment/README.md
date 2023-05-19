# VMware Tanzu Integration

1. Use Bitnami as base image that are continuously maintained & verifiably tested for use in production environments
2. Store dependencies in vars.yml which will be picked up during deployment
3. Isolate development and production environment by deploying to diferrent routes [dev](https://dev-lantana.apps.tas.tz-hackathon.net) & [prod](https://lantana.apps.tas.tz-hackathon.net)
4. Can achieve Blue-Green Deployment by adding one more route (not implemented for now)
5. Setup Continuous Deployment (CD) to VMware TAS in GitHub action pipeline
6. Enable App Autoscaler with rules: scale up when CPU Utilization is more than 70%; scale down when it is less than 20%
7. App revisions are enabled by default for roll back purpose.
8. Stream the application log to Papertrail for archive and debugging purpose e.g.[filter log level in Papertrail](papertrail-log.png)

## Deployment using Cloud Foundry cli

1. update the environment variables in vars.yml and match it with the application env in manifest.yml
2. deploy the application to VMware TAS by running the command as below

### dev-environment

```shell
cf push --vars-file vars.yml -f manifest.yml dev-lantana
```

### prod-environment

```shell
cf push --vars-file vars.yml -f manifest.yml lantana
```
