# Google-docs-clone
Company assignment of App Avangers



## Teach-Stack
| UI-Part | Controller | Server-Part |
|---------|------------------|--------------|
|![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)|![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) |![Express.JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Socket-io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)|

## Deployments
|FRONTEND|BACKEND|DATABASE|
|--------|-------|--------|
|![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)|![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## Pages
### :small_blue_diamond: Sign-up Page
Sign-up by providing a unique username, your email & password

----
![signup](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/28b654f6-37d2-470d-b163-234d7141ff7e)



### :small_blue_diamond: Sign-in Page
Sign-in with your unique credentails [email, password]

----
![login](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/09c39b83-05cc-4773-b8d5-e64dbd5dea23)



### :small_blue_diamond: Home Page
After successfully authenticated you will be redirected to HOME page, there you will see the list of public documents.

----
![home](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/4f64a785-1d16-4d13-8992-e86f64466922)


### :small_blue_diamond: Create Document
Create document by providing the name

----
![Create document](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/64a04c06-9aa6-4077-9c97-e635fd340c07)



### :small_blue_diamond: My-applications
Checkout your own private and public applications

----
![my-documents](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/9d388c90-40c6-4a2f-b0f5-025a93247455)


### :small_blue_diamond: Single-application
Edit and see single doc, edit only if it's your

----
![my-documents](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/9d388c90-40c6-4a2f-b0f5-025a93247455)




---

## API Routes

The following table lists the available API routes and their descriptions:

| Route | Method | Description |
|-------|-------------|----------|
| auth/signup/ | `POST` | Register user's data in Database |
| auth/signin/ | `POST` | By checking user's credentials allow them to log-in in the web-applicattion |
| profile/ | `PATCH` |	Update logged-in user's profile |
| docs/ | `GET` |	Get all public docs |
| docs/user | `GET` |	Get all docs for the logged-in user |
| docs/ | `POST` | Post / Create document |
| docs/:docId | `PATCH` | Update specific doc's details and allowed only for the author |
| docs/:docId | `DELETE` | Delete specific doc and allowed only for the author |

Thank you 💙
