import { Environment } from '@abp/ng.core';

const baseUrl = 'https://calm-bay-08feb9300.5.azurestaticapps.net';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'ZeroOneSystem',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://zeroonesystem-staging-api.azurewebsites.net/',
    redirectUri: baseUrl,
    clientId: 'ZeroOneSystem_App',
    responseType: 'code',
    scope: 'offline_access ZeroOneSystem',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://zeroonesystem-staging-api.azurewebsites.net',
      rootNamespace: 'ZeroOneSystem',
    },
  }, 
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  },
} as Environment;
