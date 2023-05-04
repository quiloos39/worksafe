## Abstract

Generating a project idea that aligns with a company's culture and history can be challenging, particularly when there are numerous ideas to consider and limited time to decide. This project focuses on developing an incident tracking application that allows customers to easily track and monitor their incidents.

You can access live demo of the project
Web Version: [http://web.worksafe.necdet.xyz/](http://web.worksafe.necdet.xyz/) or [https://worksafe-web.vercel.app/](https://worksafe-web.vercel.app/)
Mobile Version: [https://mobile.worksafe.necdet.xyz/](https://mobile.worksafe.necdet.xyz/)
Strapi: [https://api.worksafe.necdet.xyz/admin](https://api.worksafe.necdet.xyz/admin)

## Features

| Name              | Description                                     | Implemented |
| ----------------- | ----------------------------------------------- | ----------- |
| Incident tracking | Customers can track and monitor their incidents | Yes         |
| Safety checklist  | Customers can complete a safety checklist       | No          |

## Some Notes

This project utilizes Lerna, a modern and efficient build system designed to manage and publish multiple JavaScript/TypeScript packages from a single repository. The reason for utilizing Lerna is to create an abstraction layer over Strapi's REST API with TypeScript typings. By leveraging the capabilities of Lerna, this project can efficiently manage dependencies, optimize build times, and simplify the process of publishing and versioning packages. Additionally, this abstraction layer will provide a simplified interface for interacting with Strapi's REST API, making it easier to develop and maintain applications that use Strapi as a backend.

## How to setup the project

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project and run yarn to install the necessary dependencies.
3. Locate the .env.example files in the backend, frontend, and mobile packages, and make a copy of each one. Rename these copied files to .env.
4. Open the .env files and modify the variables to match your environment settings. This step is crucial to ensure that the project runs smoothly and securely.
5. Finally, run yarn develop to start the project.
