import * as passport from 'passport';
import * as passportLocal from 'passport-local';
// import * as passportFacebook from 'passport-facebook';
// import { find } from "lodash";
import { IUser } from '../interfaces';
import { UserModel, AgentModel, StudentModel, FacebookModel } from '../models';
import { NativeError } from 'mongoose';
import * as passportJwt from 'passport-jwt';
import env from '../config/env.config.manager';
import { IncomingMessage } from 'http';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<unknown, IncomingMessage>((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: NativeError, user: IUser) => done(err, user));
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email: string, password: string, done) => {
      const user_details = {};
      const user: IUser = await UserModel.findOne({
        $or: [{ email: email.toLowerCase() }, { phone: email }]
      });

      if (!user) {
        return done(null, false, {
          message: `Email ${email} not found.`
        });
      }
      if (!user.validPassword(password) && req.body.graphDomain != 'facebook') {
        return done(null, false, {
          message: 'Invalid email or password.'
        });
      }
      if (req.body.graphDomain == 'facebook') {
        const userF = await FacebookModel.findOne({
          user: user,
          facebook_id: req.body.id
        });
        if (!userF) {
          return done(null, false, {
            message: 'Facebook user not found.'
          });
        }
        user_details['facebook_profile'] = userF;
      }

      user_details['token'] = user.generateJwt();
      user_details['_id'] = user._id;
      user_details['email'] = user.email;
      user_details['phone'] = user.phone;
      user_details['first_name'] = user.first_name;
      user_details['last_name'] = user.last_name;
      user_details['languages'] = user.languages;
      user_details['location'] = user.location;
      user_details['phone_verified'] = user.phone_verified;
      user_details['verification_link'] = user.verification_link;
      user_details['email_verified'] = user.email_verified;
      user_details['user_type'] = user.user_type;
      user_details['created_at'] = user.created_at;
      user_details['updated_at'] = user.updated_at;
      user_details['image_path'] = '';
      if (user.image_path) {
        const host = `${req.protocol}://${req.get('host')}/static/images/${
          user.image_path
        }`;
        user_details['image_path'] = host;
      }
      if (user.user_type == 'Agent') {
        const _id = user.agentProfile as unknown as string;

        const agent = await AgentModel.findById(_id);

        // .select(['-first_name', '-last_name', '-created_at', '-updated_at']);
        user_details['info'] = agent;
      } else if (user.user_type == 'Student') {
        const student = await StudentModel.findOne({
          _id: user.studentProfile as unknown as string
        });
        // .select(['-first_name', '-last_name', '-created_at', '-updated_at']);
        user_details['info'] = student;
      }
      return done(null, user_details);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.getEnvValue('SECRET')
    },
    async (jwtToken, done) => {
      const user: IUser = await UserModel.findOne({ email: jwtToken.email });
      if (!user) {
        return done(null, false);
      }
      return done(null, user, jwtToken);
    }
  )
);

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '612915226456454',
//       clientSecret: '4ed8afa46e559b6f7e16263d40eac22c',
//       callbackURL: '/auth-facebook',
//       profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
//       passReqToCallback: true
//     },
//     (req: any, accessToken, refreshToken, profile, done) => {

//     if (req.user) {
//         UserModel.findOne({ facebook: profile.id }, (err: NativeError, existingUser: IUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 req.flash("errors", { msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account." });
//                 done(err);
//             } else {
//                 UserModel.findById(req.user.id, (err: NativeError, user: IUser) => {
//                     if (err) { return done(err); }
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: "facebook", accessToken });
//                     user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.profile.gender = user.profile.gender || profile._json.gender;
//                     user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
//                     user.save((err: Error) => {
//                         req.flash("info", { msg: "Facebook account has been linked." });
//                         done(err, user);
//                     });
//                 });
//             }
//         });
//     } else {
//         UserModel.findOne({ facebook: profile.id }, (err: NativeError, existingUser: IUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 return done(null, existingUser);
//             }
//             UserModel.findOne({ email: profile._json.email }, (err: NativeError, existingEmailUser: IUser) => {
//                 if (err) { return done(err); }
//                 if (existingEmailUser) {
//                     req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
//                     done(err);
//                 } else {
//                     const user: any = new UserModel();
//                     user.email = profile._json.email;
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: "facebook", accessToken });
//                     user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.profile.gender = profile._json.gender;
//                     user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
//                     user.profile.location = (profile._json.location) ? profile._json.location.name : "";
//                     user.save((err: Error) => {
//                         done(err, user);
//                     });
//                 }
//             });
//         });
//     }
//     }
//   )
// );

/**
 * Login Required middleware.
 */

/**
 * Authorization Required middleware.
 */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//     const provider = req.path.split("/").slice(-1)[0];

//     const user = req.user as IUser;
//     if (find(user.tokens, { kind: provider })) {
//         next();
//     } else {
//         res.redirect(`/auth/${provider}`);
//     }
// };
