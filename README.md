# Pixel Front End Takehome

<details>
  <summary>Assignment</summary>
As players interact with different games and metaverses, they leave a history of events that define who they are. Every single action might not say much, but the collection of them represents an entity's identity and reputation.

For this take-home, we want you to build a little piece of the platform that will help participants show who they are. We want you to build a web app that takes a Ronin address as input and  shows the set of relevant transactions for that account in the Axie ecosystem, as well as any aggregates that you deem informative. Here are some examples that are not meant to be exhaustive but just give you an idea: claimed SLP on a given period, the scholar's Axies, type of account.

For instance, this the address corresponding to a scholar: `ronin:4d51e82c92c5e89176f006d8425330aa5ff3a4c4`. Among others, it has several Claim SLP actions, only some of which will have a relevant amount (most of them are 0). Here's the address of an account that is likely an investor/breeder (can we infer that in an automated fashion?): `ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d559732`.

Here's the link to the Ronin explorer: https://explorer.roninchain.com. Note that there is no documentation for the endpoints of this API. Go ahead and dig into the network console to find the relevant ones for this assigment. If you are stuck and cannot figure them out, please ping us so we can provide you with them.

Deliverable:
- Please fork this repo and push your solution.
- Runnable code + appropriate testing + documentation.

Evaluation Criteria:

We should be able to execute your solution without much hassle, and the app should be intuitive to use. We will evaluate your code based on clarity, performance, and maintainability. Make sure to include relevant tests and documentation.

Let us know if you have any questions. Happy coding!

</details>


Uploading Screen Recording 2022-02-22 at 02.10.14.mov…


## Requirements

There is a docker-compose setup to run the app locally without needing to install anything outside the container (Except for docker & docker compose, [Installation Guide](https://docs.docker.com/compose/install/)).

The app itself has been deployed to Github Pages and one can visit it by accessing this link: [Site](https://sebiglesias.github.io/takehome-front)

Otherwise, one can run the application locally using `node version 16`. Look into [NVM](https://github.com/nvm-sh/nvm) for node version management handling.

## Build

```bash
npm run build
```

## Run App

```bash
./start.sh # to start docker compose
./stop.sh # to stop docker compose
# OR
npm run start
```
[URL for npm run start](http://localhost:3000)
[URL for docker](http://localhost:80)

## Considerations

The project is a `create-react-app`, I'm using typescript and plain css. For components I'm using the [Material UI](https://mui.com/) library.

In order to determine a scholar from an investor I'm using the following criteria:

- A scholar will have SLP transactions or holdings where a breeder or investor will probably not.
- A breeder/investor will have a high number of transactions that don't include SLP and different holdings as well.

### Things to improve on

- I'm not using some transaction endpoints that where available in the website, mainly because I couldn't pass info to the decoder. I experimented a bit trying to determine the type of transaction from the `to` and `from` address but deemed it not worth pursuing, as it would have taken me more time.
- Have some sort of integration tests to test the app as a whole, only unit tests where added.
- Look into the Axies infinity graphql api for additional information to base decision on.
