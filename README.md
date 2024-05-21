# Stalotto | Front-End

Stalotto is an e-commerce platform where influencers & brands can host competitions & giveaways.

## Stack

[![Stack](https://skillicons.dev/icons?i=react,graphql,git,github,aws)](https://skillicons.dev)
<br/>

## Tabulated List of CLI Helper Commands:

### Quick References

-   Start Vite Development Server: `make start dev vite`
-   Start Production Server: `make start prod`

| Command | Argument 1 | Argument 2 | Argument 3 | Argument 4 | Command                                                         | Function                                                             |
| ------- | ---------- | ---------- | ---------- | ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| make    | start      | dev        | vite       |            | docker-compose -f ./compose/compose.dev-vite.yaml up -d         | starts running vite development server                               |
| make    | start      | dev        | vite       | build      | docker-compose -f ./compose/compose.dev-vite.yaml up -d –build  | starts running vite development server & rebuilds images             |
| make    | start      | dev        | nginx      |            | docker-compose -f ./compose/compose.dev-nginx.yaml up -d        | starts running nginx development server                              |
| make    | start      | dev        | nginx      | build      | docker-compose -f ./compose/compose.dev-nginx.yaml up -d –build | starts running nginx development server & rebuilds images            |
| make    | start      | prod       |            |            | docker-compose -f ./compose/docker-compose.yaml up -d           | starts running production nginx server                               |
| make    | start      | prod       | build      |            | docker-compose -f ./compose/docker-compose.yaml up -d –build    | starts running production server & rebuilds containers               |
| make    | stop       | dev        | vite       |            | docker-compose -f ./compose/compose.dev-vite.yaml stop          | stops running vite development server                                |
| make    | stop       | dev        | nginx      |            | docker-compose -f ./compose/compose.dev-nginx.yaml stop         | stops running nginx development server                               |
| make    | stop       | prod       |            |            | docker-compose -f ./compose/docker-compose.yaml stop            | stops running nginx production server                                |
| make    | remove     | dev        | vite       |            | docker-compose -f ./compose/compose.dev-vite.yaml down          | stops running vite development server & removes containers in group  |
| make    | remove     | dev        | nginx      |            | docker-compose -f ./compose/compose.dev-nginx.yaml down         | stops running nginx development server & removes containers in group |
| make    | remove     | prod       |            |            | docker-compose -f ./compose/docker-compose.yaml down            | stops running production server & removes containers in group        |

<br/>

## Setup

### Environment Variables

The project uses the following environment variables for development & production:

-   VITE_API_BASE_URL - used to connect to your development or production API.
-   VITE_MKCERT_KEY - used for SSL certification in development.
-   VITE_MKCERT_CERT - used for SSL certification in development.

Create files .env.development & .env.production in the route directory & add these environemnt variables.

### SSL Certificates

Self-signed certificates for development purposes can be created using a utility such as mkcert. Create a certificate & key & add the .pem files to the route directory, then update the environment variables VITE_MKCERT_KEY & VITE_MKCERT_CERT to reflect these files.

<br />

## Special Thanks:

-   **Gulshan Songara** - templating & styling.
    -   **[Portfolio Website](https://gulshansongara.netlify.app)**
    -   **[Linkedin](https://www.linkedin.com/in/gulshan-songara/)**

<br/>

## License:

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE.md) file for details.
