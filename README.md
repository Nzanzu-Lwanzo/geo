# GEO

## How do I use Geo ?

Simple. Just pull the Docker image `lwanzo/geo:latest` or build it and do whatever you want with it. All the data is self contained. Or, you can use our API [right here](https://geo.lwanzo.site/). Or, you can just copy the json.
> Freely you have received, freely give (Matthew 10:8)

## Developement Workflow

Geo uses Docker so you should be comfortable with its major concepts and how it works. There's a Github Actions workflow that builds the image when we commit to the root branch and pushes it to Docker Hub.

You need a Redis instance to run the project. Redis is used for caching. You can use Redis in Docker (which is the default behavior) or provide your own `REDIS_URL` (see the in the .env file).

These env variables are needed :

```bash
PORT # optional
NODE_ENV=dev # required -this should be 'dev' in development
REDIS_URL # required
REDIS_PASSWORD # optional if you don't use Makefile commands
```

To start up the project (run Redis database and the Express server, all at once), simply open your terminal in the root of the project and execute `make`. This works in Linux (at least, distros that support Makefile). If the command does not work, just copy commands from the Makefile. To know what to copy, see below :

```bash
@echo 'Stop any previous Redis container'
docker container stop geo-redis # copy this
```

## How is the project organized ?

The magic is under the data subfolder. It contains two types of file :

1. The `$.json` contains an array of all the 195 (recognized be the UN) with they country codes and ISO Code.
2. Each of the other files is named after the ISO Code of a country and contains a list of its cities.

## How to use ?

Dude, the Bible says freely give not freely teach. And there's nothing to teach, I think everything is pretty straightforward and how you use this depends on your needs.

## Using the API

You have three endpoints :

1. `/` : well, I'm the biggest fan of 2Pac Shakur.

2. `/countries` : returns an array of all the countries.

3. `/countries/search` : accepts two query strings - `q` (search hint) and `l` (language, en or fr). Returns an array of the countries.

4. `/cities/:coid` : where **coid** is the ISO code of each country, returns the cities of that country.

5. `/cities/:coid/search` : accepts one query string - `q` (search hint) - where **coid** is the ISO code of the country. Returns cities of that country which start with the search hint.

We have two main interfaces :

```typescript
interface Country {
  id: string; // unique uuid
  name: {
    en: string; // name in french
    fr: string;  // name in english
  };
  phone_code: string; // is prefixed by +
  iso_code: string; // given the Congo-Kinshasa, this is CD
}

interface CountryCities {
  coid: string; // corresponds to the iso_code of the country
  cities: {
    id: string; // unique slug id generated from name
    name: string; // name of the city
  }[];
}

```

## Can I help ?

Sure ! There's a lot to do : some countries have less cities than others, there's for sure a lot of errors that need to be fixed, ... Just, clone or fork and pull request.

## Credit

Thanks to ChatGPT, Microsoft Copilot, [ToniCifre](https://github.com/ToniCifre) and his [all-countries-and-cities-json](https://github.com/ToniCifre/all-countries-and-cities-json) for they provided all the data necessary.
