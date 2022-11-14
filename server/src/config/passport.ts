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
}
