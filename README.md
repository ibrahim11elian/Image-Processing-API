# Image-Processing-API

This is an API for doing some operations on images like resize, crop, grayScale, blur.  
The API response with processed image exept the api/image route response with image url.

<h3>Note:</h3> This project is project one from the Udacity full stack nano dgree program

## Table of contents

- [Overview](#overview)

  - [File Structure](#file-strcture)
  - [setup](#setup)
  - [API](#api)
  - [Screenshot](#screenshots)

- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

Users should be able to:

- request an image and get back url for it
- do image processing like resize,..
- change the returned image format

### File Strcture

```
├── assets
│     ├── images
│     ├── thumnail
│     ├── blured
│     ├── croped
│     └── gray
│
├── node_modules
├── spec
│      └── support
│           └── jasmine.json
├── src
│     ├──  routs
│     │      └── api
│     │          └── images
│     │                └── index.ts
│     ├──  tests
│     │     ├── helpers
│     │     │      └── reporter.ts
│     │     ├── utilitis
│     │     │     └── images
│     │     │           ├── blurSpec.ts
│     │     │           ├── cropSpec.ts
│     │     │           ├── getSpec.ts
│     │     │           ├── graySpec.ts
│     │     │           └── resizeSpec.ts
│     │     │
│     │     └── serverSpec.ts
│     │
│     ├──  utilitis
│     │     ├── images
│     │     │      ├── blur.ts
│     │     │      ├── crop.ts
│     │     │      ├── get.ts
│     │     │      ├── gray.ts
│     │     │      └── resize.ts
│     │     │
│     │     └── operations.ts
│     │
│     └── server.ts
│
├── package-lock.json
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── .prettierrc
└── README.md

```

### Setup:

- you have to install all dependencies from:

```
npm install
```

- To build the project run:

```
npm run build
```

- For testing run:

```
npm run test
```

- To start the server you run:

  This will build the project before start

```
npm run start
```

- Or you can run:

  This will run the server directly

```
node ./build/server.js
```

### API:

- For resize image:

```
http://{host}/api/images/resize?fname={image name => must be in image folder}&width={ prefared width }&height= {prefared height => not mandatory}
```

- For crop image:

```
http://{host}/api/images/crop?fname={image name => must be in image folder}&width={ prefared width }&height={prefared height}&top={Y coord}&left={X coord}
```

- For grayscale image:

```
http://{host}/api/images/gray?fname={image name => must be in image folder}
```

- For blur image:

```
http://{host}/api/images/blur?fname={image name => must be in image folder}&effect={bulr effect intensity}
```

<strong>Note:</strong> For above APIs you can add query for change the responsed iamge, the query name is "format" and you can chose from: (jpg => defulte, png, jpeg).

- For gitting image url:

```
http://{host}/api/images?fname={image name => must be in image folder}
```

&emsp;&ensp; - Response example:

```json
{
  "cod": 200,
  "msg": "image found",
  "url": "http://localhost:3000/images/tutor-5.png"
}
```

```json
{
  "cod": 404,
  "msg": "image not found"
}
```

### Screenshots

<strong>resize example</strong>

![resize example](./assets/screenShots/resize.PNG 'resize')

<strong>crop example</strong>

![crop example](./assets/screenShots/crop.PNG 'crop')

<strong>gray example</strong>

![gray example](./assets/screenShots/gray.PNG 'gray')

<strong>blur example</strong>

![blur example](./assets/screenShots/blur.PNG 'blur')

<strong>get image url example</strong>

![get image url example](./assets/screenShots/get-image.PNG 'get image url')

## My process

### Built with

- Node.js
- Express.js
- Typescript
- Unit test with Jasmine
- Formatting with Prettier and Eslint

### What I learned ?

The API i created presents my first opportunity to pull together the skills i learned through the course(Udacity full stack nano degree) and tie them together in a commonly used application. Besides solidifying my skills, i also had the opportunity to problem-solve and work with the documentation of a popular image processing utility.

The following are just some of the questions that i experienced along the way:

- What’s the ideal workflow?
- How should I structure my project?
- How do I want to write my asynchronous TypeScript?
- How many functions do I need to complete this task?
- What types of things should I test for?

## Author

- Frontend Mentor - [@ibrahim11elian](https://www.frontendmentor.io/profile/ibrahim11elian)
- Facebook : [@ibrahim11ahmed](https://www.facebook.com/ibrahim11ahmed/)
- Linkedin : [@ibrahim-ahmed-a8bba9196](https://www.linkedin.com/in/ibrahim-ahmed-a8bba9196/)
