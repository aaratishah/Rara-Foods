# RARA Frontend

## Project Description

RARA Foods provides food ordering and delivery services throughout the Australia. It is dedicated towards the prosperity of the nation, consumer and the business itself.

Silicontech Nepal Pvt. Ltd. developed this platform upon the request of the RARA Foods in which more than 1 years was invested for the research of other food delivery and ordering system to make it even better than the other competitors.
Some of the advance services that RARA Foods provides are:

- Food re-ordering
- listing & advertising opportunity for small and medium businesses
- easy access to information among nepalse community
- jobs portal

---

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Cloning and Running the Application in local

### Clone

Clone this repo to your machine using

``

### Install Dependencies

> use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
$ npm install
```

### Environment configuration

Move or Rename `.env.example` to `.env` file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE. You may want to do something like

```
NODE_ENV = development
#Set your database/API connection information here
API_HOST_DEVELOPMENT = http://localhost:5000
API_HOST_PRODUCTION = production ip address and port number
```

### Run the app in the development mode

```bash
$ npm start
```

The Application Runs on `localhost:3000`

## Update sources

Some packages usages might change so you should run `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm install

## Built With

- [Ant Design](https://ant.design/components/overview/) - An enterprise-class UI design language and React UI library with a set of high-quality React components.
- [React-Router](https://reacttraining.com/react-router/web) - React Router is the standard routing library for React.
