## Abstract

Figuring out a project idea that aligns with a company's culture and history can be challenging, particularly when there are numerous ideas to consider and limited time to decide. This project focuses on developing an incident tracking application that allows customers to easily track and monitor their incidents.

You can access live demo of the project from following

```txt
LOGIN INFORMATION

email: test@test.com
password: 123456
```

Web: [http://web.worksafe.necdet.xyz/](http://web.worksafe.necdet.xyz/) or [https://worksafe-web.vercel.app/](https://worksafe-web.vercel.app/)

Mobile: [https://mobile.worksafe.necdet.xyz/](https://mobile.worksafe.necdet.xyz/)

Strapi: [https://api.worksafe.necdet.xyz/admin](https://api.worksafe.necdet.xyz/admin)

## Features

| Name                 | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| Incident tracking    | Customers can track and monitor their incidents             |
| ~~Safety checklist~~ | ~~Customers can complete a safety checklist~~               |
| ~~Dynamic homepage~~ | ~~Editors would be able to modify their pages dynamically~~ |

## How to setup the project

1. Clone the this monorepo to your local machine.
2. Navigate to the root directory of the project and run `yarn install` to install the necessary dependencies.
3. Locate the `.env.example` files in the backend, frontend, and mobile packages, and make a copy of each one. Rename these copied files to `.env`.
4. Follow related package documentation from `packages/[name]/README.md` to learn how to set up environment.
5. Run `yarn build` to build packages.

## Some Notes

This project utilizes Lerna, a modern and efficient build system designed to manage and publish multiple JavaScript/TypeScript packages from a single repository. Reason for using lerna is to make development of multiple packages easier and to separate concerns

While I could have opted to develop this web app using React Native, I ultimately decided against it. In my experience, React's web library offers greater freedom and flexibility for this type of project.

For this project, I utilized the Native Base and Chakra UI frameworks as my design system. Although I am confident in my own design skills, I didn't feel like I had enough time to showcase them. Using an existing design system allowed me to focus on other aspects of the project.

For this project, I selected Strapi over other frameworks such as NestJS or Express due to its scalability and built-in features such as authentication and authorization, a role-based access, and an admin panel. These capabilities allowed me to focus on developing the core features of the app instead of writing boiler plate.

I have experience building dynamic pages in the past, but I haven't had the opportunity to implement them recently due to time constraints.
