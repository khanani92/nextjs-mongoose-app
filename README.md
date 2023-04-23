[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ❤️ Mongoose</h1>

<div align="center">
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkhanani92%2Fnextjs-mongoose-app&env=MONGODB_URI,CLOUDINARY_URL,NODEMAILER_CONFIG,WEB_URI&envDescription=Environment%20Variables&envLink=https%3A%2F%2Fgithub.com%2Fkhanani92%2Fnextjs-mongoose-app%23environmental-variables&demo-title=nextjs-mongoose-app%20demo&demo-description=A%20demo%20deployed%20on%20Vercel&demo-url=https%3A%2F%2Fnextjs-mongoose.vercel.app%2F)

An [**Next.js**](https://github.com/zeit/next.js/) and [**Mongoose**](https://mongoosejs.com/) web application, designed with simplicity for learning and real-world applicability in mind.

:rocket: [Check out the demo](https://nextjs-mongoose.vercel.app/) :rocket:

</div>

<h2 align="center">Features</h2>

<div align="center">

🐇 Fast and light without [bulky](https://bundlephobia.com/result?p=express@4.17.1), [slow](https://github.com/fastify/benchmarks#benchmarks) Express.js.

✨ Full [API Routes](https://nextjs.org/blog/next-9#api-routes) implementation and 👻 Serverless ready

🤠 Good ol' Middleware pattern, compatible with Express ecosystem, powered by [next-connect](https://github.com/hoangvvo/next-connect)

💋 [KISS](https://en.wikipedia.org/wiki/KISS_principle): No fancy stuff like GraphQL, SASS, Redux, etc.
✍️ Come with explanatory blog posts

📙 Can be adapted to any databases besides MongoDB/Mongoose (Just update [api-lib/db](api-lib/db))

</div>

<h3 align="center">:lock: Authentication and Account</h3>

<div align="center">

- [x] Session-based authentication ([Passport.js](https://github.com/jaredhanson/passport))
- [x] Sign up/Log in/Sign out API
- [x] Authentication via email/password
- [ ] Authentication via OAuth (Google, Facebook, etc.)
- [x] Email verification
- [x] Password change
- [x] Password reset via email
- [x] Auth Middileware

</div>

<h3 align="center">:woman::man: Profile</h3>

<div align="center">

- [x] Profile picture, username, name, bio, email
- [x] Update user profile

</div>

<div align="center">
  
<sup>Have any features that interest you, [make an issue](https://github.com/khanani92/nextjs-mongoose-app/issues). Would like to work on a feature, [make a PR](https://github.com/khanani92/nextjs-mongoose-app/pulls).<sup>
  
</div>

<h3 align="center">Dependencies</h3>

This project uses the following dependencies:

- `next.js` - v9.3 or above required for **API Routes** and new [**new data fetching method**](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering).
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `swr` - required for state management, may be replaced with `react-query`
- `mongoose` - may be replaced by `mongodb`.
- `passport`, `passport-local` - required for authentication.
- `next-connect` - recommended if you want to use Express/Connect middleware and easier method routing.
- `next-session`, `connect-mongo` - required for session, may be replaced with other session libraries such as `cookie-session`, `next-iron-session`, or `express-session` (`express-session` is observed not to work properly on Next.js 11+).
- `bcryptjs` - optional, may be replaced with any password-hashing library. `argon2` recommended.
- `validator` - optional but recommended, to validate email.
- `ajv` - optional but recommended, to validate request body.
- `multer` - may be replaced with any middleware that handles `multipart/form-data`
- `cloudinary` - optional, **only if** you are using [Cloudinary](https://cloudinary.com) for image upload.
- several other optional dependencies for cosmetic purposes.
- `nodemailer` - optional, **only if** you use it for email. It is recommended to use 3rd party services like [Mailgun](https://www.mailgun.com/), [AWS SES](https://aws.amazon.com/ses/), etc. instead.

<h3 align="center">Environmental variables</h3>

Environmental variables in this project include:

- `MONGODB_URI` The MongoDB Connection String (with credentials and database name)
- `WEB_URI` The _URL_ of your web app.
- `CLOUDINARY_URL` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).
- `NODEMAILER_CONFIG` (optional, if using nodemailer **only**) JSON stringified nodemailer config. eg. `{"service":"Gmail","auth":{"user":"muddassirkhanani@gmail.com","pass":"aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ=="}}`

<h3 align="center">Development</h3>

Start the development server by running `yarn dev` or `npm run dev`. Getting started by create a `.env.local` file with the above variables. See [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

<h2 align="center">Deployment</h2>

This project can be deployed [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your cloud/hosting providers.

After building using `npm run build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.

<h2 align="center">Contributing</h2>

<div align="center">
  
Please see my [contributing.md](CONTRIBUTING.md).

</div>

<h2 align="center">
  License
</h2>

<div align="center">
  
  [MIT](LICENSE)
  
</div>