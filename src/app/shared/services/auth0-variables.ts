import { environment } from '../../../environments/environment';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'rlX94MCWFLhDAp80Jm1HlilNA54zRN9l',
  CLIENT_DOMAIN: 'nhlpoolhelper.auth0.com',
  AUDIENCE: 'nhl-pool-helper-api',
  REDIRECT: 'https://nhlpoolhelpermobile.herokuapp.com/callback',
  SCOPE: 'openid profile'
};
