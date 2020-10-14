# About

This repository contains the source code for my personal website. The website is hosted on a Rasberry Pi using Docker containers. My motivation for creating this project was to learn more about Docker and host a low-cost website on a Raspberry Pi using modern front and backend web technologies.

## Architecture

The project uses five Docker images that are compatible with the Raspberry Pi ARM architecture.

### [oznu/cloudflare-ddns](https://hub.docker.com/r/oznu/cloudflare-ddns)

Since I'm using a residential IP address, this container is responsible for keeping the DNS records on the domain name up-to-date.

### [hypriot/rpi-mysql](https://hub.docker.com/r/hypriot/rpi-mysql)

Raspberry Pi compatible Docker image with MySQL for the WordPress website.

### [nginx](https://hub.docker.com/_/nginx)

Nginx is used as a reverse proxy which routes requests to either the Node/Express server hosting a Nuxt (Vue.js) application or the WordPress website.

### [node](https://hub.docker.com/_/node)

Node application which contains an Express server and the frontend of the application created with Nuxt.

### [wordpress](https://hub.docker.com/_/wordpress)

Lastly, the WordPress container functions as a rich content editor and headless CMS.