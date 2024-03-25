# serverless
This is designed to run on google cloud functions, Gen - 2. Provides email verification service by sending an email containing the verification link and tracking it in MySQL database.

## Instructions
1. Create Google cloud storage bucket to store the codebase as ".zip"
2. Create Google cloud function and configure it to use the zipped code
3. Have a domain name
4. Setup a server that can process the verification end point which is accessible through your domain name 
5. Setup an account on SENDGRID
   1. Authenticate your domain
   2. Generate an API key
   3. Create a custom email template
6. Setup a MySQL server and allow cloud function to connect to it
7. Set Following Environment Variables
    - SEND_GRID_KEY - SendGrid API key
    - SEND_GRID_FROM - email of the sender
    - SEND_GRID_TEMPLATE_ID - Id of the custom template created on SendGrid 
    - DOMAIN_PROTOCOL - Protocol for your domain (http or https)
    - DOMAIN_NAME - Doman name
    - WEBAPP_PORT - Port on which the server is running
    - DB_USERNAME - Mysql DB username
    - DB_PASSWORD - Mysql DB password
    - DB_DATABASE - Mysql DB name
    - DB_HOST - Mysql DB host