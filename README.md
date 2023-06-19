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
![signup](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/694c4e2d-d39c-4a08-8006-31d2e28c95b4)


### :small_blue_diamond: Sign-in Page
Sign-in with your unique credentails [email, password]

----
![login](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/627c8329-4a6a-4742-921e-d4df9aff86a8)



### :small_blue_diamond: Home Page
After successfully authenticated you will be redirected to HOME page, there you will see the list of public documents.

----
![home](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/745b7985-9d09-4f11-aaa4-f5b1a60a3598)


### :small_blue_diamond: Create Document
Create document by providing the name

----
![create-doc](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/fcbda199-9d20-4982-87d3-417e3468b283)


### :small_blue_diamond: My-applications
Checkout your own private and public applications

----
![my-docs](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/fc97cb27-7b39-4f0e-9084-6a951b1cd5a0)


### :small_blue_diamond: Single Document
Edit and see single doc, edit only if it's your

----
![single-doc](https://github.com/Atanu8250/Google-docs-clone/assets/94675329/3e83a666-3441-42e4-97b2-ae1e64eff392)





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
