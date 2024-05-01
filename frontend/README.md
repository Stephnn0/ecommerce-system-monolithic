//-------------------------steps
// versions: node v21.4.0, npm 10.2.4

// npm init -y
// npm i express typescript
// npm i nodemon --save-dev
// tsconfig.json
//
// package.json

// "scripts": {
// "build": "tsc",
// "tsc": "tsc",
// "dev": "nodemon dist/server.js",
// "start": "node dist/server.js"
// },

// npm run dev
// npm run build

aws
-create s3
-create policy -> getObject, putObject, listObject, addArn
-create user -> attached policy, create keys

s3 bucket policy

{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "PublicReadGetObject",
"Effect": "Allow",
"Principal": "*",
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::vegeta12/*"
}
]
}

stripe
