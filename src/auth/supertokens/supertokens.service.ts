import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: process.env.ConnectionURI,
        apiKey: process.env.APIKey,
      },
      recipeList: [
        ThirdPartyEmailPassword.init({
          providers: [
            // We have provided you with development keys which you can use for testsing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            ThirdPartyEmailPassword.Google({
              clientId:
                '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
              clientSecret: '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',
            }),
            ThirdPartyEmailPassword.Github({
              clientId: '9e53683e5ef714f4f5f6',
              clientSecret: '6b7973acf76eccd208d774db992da22b87f24d18',
            }),
            // ThirdPartyEmailPassword.Apple({
            //   clientId: "4398792-io.supertokens.example.service",
            //   clientSecret: {
            //     keyId: "7M48Y4RYDL",
            //     privateKey:
            //       "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
            //     teamId: "YWQCXGJRJL",
            //   },
            // }),
            // ThirdPartyEmailPassword.Facebook({
            //    clientSecret: "FACEBOOK_CLIENT_SECRET",
            //    clientId: "FACEBOOK_CLIENT_ID"
            // })
          ],
        }),
        Session.init(),
      ],
    });
  }
}
