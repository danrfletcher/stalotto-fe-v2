## Stalotto | Front-End
[![Stack](https://skillicons.dev/icons?i=react,graphql,git,github,aws)](https://skillicons.dev)

Stalotto is an e-commerce platform where influencers & brands can host competitions & giveaways.

<br/>

## Technologies used:

- #### **React JS**
  - #### **React Router**
  - #### **React Swiper**
- #### **TypeScript**
- #### **SASS**
- #### **GraphQL**

<br/>


## Available Scripts:

#### `npm run dev`

#### `npm run test`

#### `npm run build`

#### `npm run eject`

<br/>

## Setup

### Environment Variables
The project uses the following environment variables for development & production:
- VITE_API_BASE_URL - used to connect to your development or production API.
- VITE_MKCERT_KEY - used for SSL certification in development.
- VITE_MKCERT_CERT - used for SSL certification in development.

Create files .env.development & .env.production in the route directory & add these environemnt variables.

### SSL Certificates
Self-signed certificates for development purposes can be created using a utility such as mkcert. Create a certificate & key & add the .pem files to the route directory, then update the environment variables VITE_MKCERT_KEY & VITE_MKCERT_CERT to reflect these files.

### Docker
- To run the development server, use command `docker-compose -f docker-compose.dev.yaml up -d`.
- To build the project for production, use `docker-compose -f docker-compose.prod.yaml up -d`.

<br />

## Special Thanks:

- **Gulshan Songara** - templating & styling.
  - **[Portfolio Website](https://gulshansongara.netlify.app)**
  - **[Linkedin](https://www.linkedin.com/in/gulshan-songara/)**

<br/>

## License:

This project is licensed under the  **GPL-3.0 License** - see the [LICENSE](LICENSE.md) file for details.
