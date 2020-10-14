# About

This repository contains the source code for my personal website. The website is hosted on a Rasberry Pi using Docker containers. My motivation for creating this project was to learn more about Docker and host a low-cost website on a Raspberry Pi using modern front and backend web technologies.

## Architecture

The project is made up of five Docker containers, with each container fulfilling a role.

### [CloudFlare DynDNS](https://hub.docker.com/r/oznu/cloudflare-ddns)

Since I'm using a residential IP address, this container is responsible for keeping the DNS records on the domain name up-to-date.
