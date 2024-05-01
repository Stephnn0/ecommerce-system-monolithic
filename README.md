# Ecommerce Website Readme

Welcome to our full-stack ecommerce website! This project is built with React, Node.js, TypeScript, and utilizes various technologies like AWS S3 for image storage, Stripe for payments, and MySQL for the database. Below you'll find instructions on how to set up and run the project, as well as an overview of its features and architecture.

## Features

- **Admin Dashboard**: Manage sales, orders, customers, and products efficiently.
- **Analytics**: Gain insights into sales data and customer behavior.
- **Modern Frontend**: Built with React, React Query, and Tailwind CSS for a sleek and scalable UI.
- **Global Error Handling**: Robust error handling throughout the application.
- **Modular Architecture**: Organized codebase for easier maintenance and scalability.
- **Rate Limiting**: Protects against abuse and ensures smooth performance.
- **Uncaught Exception Handling**: Comprehensive handling of unforeseen errors.

## Installation

### Backend

1. Navigate to the `backend` folder.
2. Compile TypeScript: `tsc`.
3. Install npm dependencies: `npm install`.
4. Run Docker to set up MySQL test database: `docker run -d -p 3306:3306 --name=mysql-test -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=test mysql:latest`.

### Frontend

1. Navigate to the `frontend` folder.
2. Install npm dependencies: `npm install`.

## Usage

1. Start the backend server: `npm start` within the `backend` folder.
2. Start the frontend development server: `npm start` within the `frontend` folder.
3. Access the application at `http://localhost:3000`.

## Contributing

We welcome contributions from the community! Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, please don't hesitate to reach out to us at [your@email.com](mailto:your@email.com).

Thank you for using our ecommerce website! We hope you enjoy it.
