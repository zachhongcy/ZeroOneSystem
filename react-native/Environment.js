
const yourIP = 'Your Local IP Address etc 192.168.1.64'; // See the docs https://docs.abp.io/en/abp/latest/Getting-Started-React-Native?Tiered=No
const port  = 44305;
const apiUrl = 'https://zeroonesystem-staging-api.azurewebsites.net';
const devApiUrl = 'https://5915-2001-f40-904-1cb-d0ba-3f95-9e06-edd2.ngrok-free.app'
const ENV = {
  dev: {
    apiUrl: devApiUrl,
    oAuthConfig: {
      issuer: devApiUrl,
      clientId: 'ZeroOneSystem_App',
      scope: 'offline_access ZeroOneSystem',
    },
    localization: {
      defaultResourceName: 'ZeroOneSystem',
    },
  },
  prod: {
    apiUrl: apiUrl,
    oAuthConfig: {
      issuer: apiUrl,
      clientId: 'ZeroOneSystem_App',
      scope: 'offline_access ZeroOneSystem',
    },
    localization: {
      defaultResourceName: 'ZeroOneSystem',
    },
  },
};

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};
