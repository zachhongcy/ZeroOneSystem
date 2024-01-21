import { Environment } from '@abp/ng.core';

const baseUrl = 'https://ambitious-plant-0200c8700.4.azurestaticapps.net';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'ZeroOneSystem',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://zeroonesystem-api.azurewebsites.net/',
    redirectUri: baseUrl,
    clientId: 'ZeroOneSystem_App',
    responseType: 'code',
    scope: 'offline_access ZeroOneSystem',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://zeroonesystem-api.azurewebsites.net',
      rootNamespace: 'ZeroOneSystem',
    },
  },
} as Environment;
