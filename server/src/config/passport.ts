import GoogleStrategy from "passport-google-oauth2";
import LocalStrategy from "passport-local";

import User, { IUser } from "@/models/users.models";

export default function (passport) {
  passport.serializeUser(function (user: IUser, done: any) {
    done(null, { id: user.id, email: user.email, username: user.username });
  });

  // used to deserialize the user
  passport.deserializeUser(function (user, done: any) {
    User.findById(user?.id, function (err, user) {
      if (err) {
        console.log("ERR", err);
        return done(err);
      }
      done(err, user);
    });
  });

  passport.use(
    "local-register",
    new LocalStrategy.Strategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, username, password, done) => {
        User.findOne({ username })
          .then(user => {
            if (user) {
              if (req.body.email === user?.email) {
                return done(null, false, { message: "Email has been already used by other user." });
              }
            } else {
              const newUser = new User({
                password,
                username,
                email: req.body.email,
              });

              newUser.save(function (err) {
                if (err) {
                  return done(err);
                }
                return done(null, newUser);
              });
            }
          })
          .catch(e => {
            return done(e);
          });
      },
    ),
  );

  passport.use(
    "local-login",
    new LocalStrategy.Strategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ username });

          if (user) {
            await user.passwordMatch(password);
            done(null, user);
          } else {
            done(null, false, {
              message: "There was a problem logging in. Check your username and password or create an account.",
            });
          }
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    "google-auth",
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/api/v1/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({ provider_id: profile.id });

          console.log(profile);

          if (user) {
            return done(null, user);
          } else {
            const randomString = Math.random().toString(36).substring(2);
            const randomNumber = Math.floor(Math.random() * 100);

            const newUser = new User({
              username: `${profile.given_name}_${profile.family_name}${randomNumber}`,
              email: profile.email,
              password: randomString,
              firstName: profile.given_name,
              lastName: profile.family_name,
              profilePicture: profile.picture,
              provider_id: profile.id,
              provider: "google",
              provider_access_token: accessToken,
              provider_refresh_token: refreshToken,
            });

            newUser.save(function (err) {
              if (err) {
                done(null, false, err);
              } else {
                console.log("SUCCESSFULL CREATED", newUser);
                done(null, newUser);
              }
            });
          }
        } catch (err) {
          console.log(err);
          return done(err);
        }
      },
    ),
  );
}
