import 'dotenv/config';

const ENV = process.env;
export const jwtConstants = {
  secret: ENV.JWT_SECRET,
};

export const googleAuthConstant = {
  clientID: ENV.clientID,
  clientSecret: ENV.clientSecret,
  callbackURL: ENV.callbackURL,
  scope: ENV.scope,
};


export const facebookAuthConstant = {
  clientID: ENV.FACEBOOK_APP_ID,
  clientSecret: ENV.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/v1/auth/facebook/callback",
  scope: "email",
  profileFields: ["emails", "name"],
}