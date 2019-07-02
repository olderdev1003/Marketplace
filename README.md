[![Stelace-platform-runner](https://user-images.githubusercontent.com/12909094/59638847-c41f1900-9159-11e9-9fa5-6d7806d57c92.png)](https://stelace.com)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stelace/jobs-marketplace-template)

# Vue marketplace template

> This Stelace template is free to use, under the terms of the [MIT license](./LICENSE).
Feel free to fork, contribute or just make it your own :heart:.

---

This template offers **a full Vue.js marketplace front-end with pre-configured serverless deployment**.

![stellar-jobs-screenshot](https://user-images.githubusercontent.com/12909094/60470099-762d0980-9c5f-11e9-8d78-0bade89101c4.jpg)

A lighter platform template focused on search and automation is [also available](https://github.com/stelace/heroes-platform-demo).

**What is Stelace?**

[Stelace](https://stelace.com/) provides search, inventory and user management infrastructure for Web platforms, ranging from search-intensive marketplaces to online community apps. Stelace offers powerful backend and APIs including advanced search, automation, and content delivery, to let you focus on what makes your platform unique.

[API Docs](https://stelace.com/docs)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
---

## Features :gift:

- [Asset](https://stelace.com/docs/assets) management and platform transaction process :chart_with_upwards_trend:
- Powerful and typo-tolerant [Search](https://stelace.com/docs/search) :mag:, on a relevance _and_ dynamic availability basis
- [User](https://stelace.com/docs/users) authentication
- User management and [Ratings](https://stelace.com/docs/ratings) :star:
- Real-time [Events](https://stelace.com/docs/command/events) and [Messaging](https://stelace.com/docs/messages)
- Automation with Stelace [Workflows](https://stelace.com/docs/command/workflows) :traffic_light:
- Headless CMS :page_with_curl: with Stelace [Content API](https://stelace.com/docs/content)
- Global CDN for images and user files
- i18n :earth_africa: and full [translations](./docs/i18n.md)
- [Performance](./docs/performance.md) (90+ Lighthouse score) :checkered_flag:
- [Accessibility](./docs/accessibility.md)
- Built-in debugging for production
- …
- and [much more](https://stelace.com) with Stelace API

## Integrations

Leverage these integrations to start running your platform even faster:

- Automated and continuous deployment with [Netlify](https://www.netlify.com/)
- Maps and place search with [OpenStreetMap](https://www.openstreetmap.org/) providers
- [Stripe](https://stripe.com/) subscriptions to monetize your premium features
- [Sentry](https://sentry.io/) for logging in production environment
- Phone validation with [Nexmo](https://www.nexmo.com/)
- Google Analytics

## Stack

- [Vue.js](https://github.com/vuejs/vue) and [Quasar](https://github.com/quasarframework/quasar)
- [Stelace Backend](https://stelace.com)
- [Stelace.js](https://github.com/stelace/stelace.js) SDK
- Node.js >= 8.9 for tooling

## Stelace Dashboard

You will be able to use [official Stelace dashboard](https://stelace.com), enabling your team to access real-time stats, settings, live design and content editing with translation tools, asset and user management and much more.

[![Stelace Dashboard](https://user-images.githubusercontent.com/12909094/38527674-415ac06c-3c5c-11e8-89d3-c92c3be1d377.png)](https://stelace.com)

## Getting started

You first need to get your Stelace API Key. Good news: [it’s free](https://stelace.com/pricing).

> Note: this template uses advanced features available in _Business_ plans or higher, such as Organizations.

1. Clone this repository

```
git clone https://github.com/stelace/jobs-marketplace-template.git
cd jobs-marketplace-template
```

2. Install node_modules

```
yarn
# or
npm install
```

3. Create environment files for development and production.
You can copy `.env.example` and fill it with Stelace API keys.

```
cp .env.example .env.development
cp .env.example .env.production
```

You need to fill the following environment variables:

- STELACE_INSTANT_WEBSITE_URL
- STELACE_*PUBLISHABLE_API_KEY (pubk_*...) used in Vue app
- STELACE_*SECRET_API_KEY (seck_*...) used in data seeding scripts

4. Start the development server

```
yarn dev
# or
quasar dev
```

Please refer to [Quasar docs](https://v1.quasar-framework.org/) for more details about configuration and info on components.

5. Seed development [data](./docs/development-data.md)

```
cp scripts/data.example.js scripts/data.js
node scripts/init-data.js
```

<details>
<summary>For Stelace Team or partners developing with on-premise API server.</summary>

Stelace Core API server has to be launched locally before starting this project's server.

First we need to launch services needed by Stelace Core API.

```
docker-compose up -d elasticsearch postgresql redis
```

Then we need to initialize the database with Instant configuration.

```
cd /path/to/stelace-core
git checkout dev
yarn setup:instant
```

Secret and publishable api keys will be displayed so you can use it as environment variables for this project.

Let’s start the server.

```
yarn start
```

You’ll probably need to set some environment variables such as STELACE_API_URL (http://127.0.0.1:API_PORT).

Please refer to`.env.example`.

</details>

## Deployment

We’ve set up continuous deployment for you with Netlify.

You just have to click "_Deploy to netlify_" above and follow the instructions to deploy.

Please refer to [deployment docs section](./docs/deployment.md) for more details or alternatives.
