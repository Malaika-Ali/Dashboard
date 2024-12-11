
# Multi-User Dashboard for Motor Health Monitoring

## Overview
This project is a multi-user dashboard designed to monitor the health of motors using data generated from machine learning models. 

The dashboard caters to three different types of users: Administrators, Factory Incharges, and Floor Incharges. Each user type has specific functionalities and access levels tailored to their roles within the organization.


## Table of Contents
- [Features](#features)
- [User Roles](#userroles)
- [Technologies Used](#tech)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Role-based access control for different user types.
- User-friendly interface for easy navigation.
- Visualizations of motor performance and health trends.
- Responsive.


## User Roles
### 1. Administrator
-Full access to all features and functionalities.
-Access to the motors' health reports from all the factories located in any area.
-User management (create, update, delete users).
-Access to comprehensive reports and analytics.

### 2. Factory Incharge
-View motor health data and performance metrics for all motors in his respective factory.
-Receive alerts for any immediate issues with motors.
-View historical data for motors in their factory.

### 3. Floor Incharge
-Access to health data for motors on their specific floor.
-Receive alerts for any immediate issues with motors.
-View historical data for motors on their floor.
## Technologies Used
Frontend: React.js, Tailwind CSS, Apex Charts, Framer Motion, React Calendar, React Hook Form
Backend: Flask
Deployment: vercel
## Installation

To set up the project locally, follow these steps:

```bash
  git clone https://github.com/Malaika-Ali/Dashboard.git
  cd Dashboard
```

To install te dependencies run the following command:
```bash
  npm i
```
    
To run the frontend server run the following command:
    ```bash
  npm start
```
## Usage
-Log in using the credentials provided for each user role.

For Admin user use :
 email: harry@gmail.com
 p.w: harry

For Factory Incharge use:
 email: new@gmail.com
 p.w: new

For Floor Incharge use:
 email: alice@gmail.com
 p.w: alice

-Navigate through the dashboard to access the features relevant to your role.
-Monitor motor health and manage maintenance tasks as needed.
## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
