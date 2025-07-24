# Task 04: Next.js To-Do App with Authentication

This is a full-stack to-do list application built with Next.js, Tailwind CSS, and NextAuth.js. Developed as the fourth task for the SkillCraft Technology internship, this app allows authenticated users to create, manage, and persist their own private to-do lists.


## ✨ Features

* **User Authentication:** Secure sign-up and sign-in functionality powered by **NextAuth.js**.
* **Social Logins:** Support for provider-based logins (e.g., Google, GitHub) for a seamless user experience.
* **Protected Routes:** User-specific to-do lists are protected, meaning only logged-in users can access and manage their own tasks.
* **Full CRUD Functionality:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their own tasks.
* **Date & Time Scheduling:** Assign a specific date and time to each task.
* **Persistent Data:** Tasks are saved to a MongoDB database and associated with the logged-in user.
* **Responsive Design:** The "Nordic Noir" theme is fully responsive and looks great on all devices.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Font:** [Poppins](https://fonts.google.com/specimen/Poppins)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

* npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/deepnav4/SCT_WD_4.git](https://github.com/deepnav4/SCT_WD_4.git)
    ```
2.  Navigate to the project directory
    ```sh
    cd SCT_WD_4
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  **Set up Environment Variables**
    Create a file named `.env.local` in the root of your project and add the necessary credentials for your database and NextAuth.js providers.

    ```env
    # Database (MongoDB)
    DATABASE_URL="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

    # NextAuth.js
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your_super_secret_key_here" # Generate one with `openssl rand -base64 32`
    GITHUB_ID="your_github_oauth_client_id"
    GITHUB_SECRET="your_github_oauth_client_secret"
    # Add other providers (e.g., GOOGLE_CLIENT_ID) as needed
    ```
5.  **Push Database Schema**
    If using Prisma, push the schema to your database. This will sync your Prisma schema with your MongoDB database.
    ```sh
    npx prisma db push
    ```
6.  Start the development server
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 👤 Author

* **Name:** Navdeep Singh
* **Internship:** Web Development Intern at SkillCraft Technology
