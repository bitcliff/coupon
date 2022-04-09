# coupon
A serverless app for managing coupon codes.

# Purpose
This project was created as the capstone project for the cloud developer course of udacity. The source code is based on the 4th project of this course. Also a client is provided and already preconfigured to test the application.

# Functionality of the application

This application will allow creating/removing/updating/fetching Coupon items. Each Coupon item can optionally have an attachment image (for storing QR-Code, the code itself and so on). Each user only has access to Coupon items that he/she has created.

# TODO items

The application will store Coupon items, and each Coupon item contains the following fields:

* `couponId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `code` (string) - the Code of a coupon which can be used in a shop (e.g. 11-22-33)
* `shop` (string) - the shop where the coupon can be used
* `dueDate` (string) - date and time by which an item should be used at the very latest.
* `used` (boolean) - true if an item was was already used in a shop.
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a coupon item

You might also store an id of a user who created a TODO item.


## Prerequisites

The application is already deployed. 
But you can deploy it also by your own.

* <a href="https://manage.auth0.com/" target="_blank">Auth0 account</a>
* <a href="https://github.com" target="_blank">GitHub account</a>
* <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version up to 12.xx 
* Serverless 
   * Create a <a href="https://dashboard.serverless.com/" target="_blank">Serverless account</a> user
   * Install the Serverless Framework’s CLI  (up to VERSION=2.21.1). Refer to the <a href="https://www.serverless.com/framework/docs/getting-started/" target="_blank">official documentation</a> for more help.
   ```bash
   npm install -g serverless@2.21.1
   serverless --version
   ```
   * Login and configure serverless to use the AWS credentials 
   ```bash
   # Login to your dashboard from the CLI. It will ask to open your browser and finish the process.
   serverless login
   # Configure serverless to use the AWS credentials to deploy the application
   # You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
   sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

If you don't want to use the preconfigured backend then do following:

Edit the `client/src/config.ts` file to set correct parameters. 


To start the client enter following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless coupon application.

# Postman collection

An alternative way to test the API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.
You have to configure apiId and authToken in the variables. You can use the preconfigured apiId, when you don't deploy the backend by yourself.

