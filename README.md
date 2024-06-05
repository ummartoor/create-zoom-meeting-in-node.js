# create-zoom-meeting-in-node.js

# Zoom Meeting Scheduler API

This project provides an API for scheduling Zoom meetings. It includes functionality for generating and managing Zoom OAuth tokens and creating meetings using the Zoom API.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Generate and manage Zoom OAuth tokens.
- Create Zoom meetings using the Zoom API.
- Handle token expiration and regeneration automatically.

## Prerequisites
- Node.js
- MongoDB(incase you want to save the meeting details)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zoom-meeting-scheduler.git
   cd zoom-meeting-scheduler
   ```
##ZOOM 
Go to zoom marketplace and 

Copy the keys and save them in .env file of your project
![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/4d0203c6-2b2f-472f-bb79-7c2774d96d59)

![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/c816f9ed-91b5-49a7-bd35-d19413c70406)
Name of your application
![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/4546430a-01dd-4ce2-b693-c8cd22affae6)
 Enter the required details 
![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/82875187-6796-4920-bfd0-568c7c6dd43f)
Select scope of your need
![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/bfbff3e9-7c2e-43fc-8871-9757dbcdfc4e)
Active the app
![image](https://github.com/ummartoor/create-zoom-meeting-in-node.js/assets/35453489/c193093c-fd5a-46cc-b0c4-7d9df0f1d1ac)


## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   PORT=5000
   ZOOM_OAUTH_ENDPOINT=https://zoom.us/oauth/token
   ZOOM_CLIENT_ID=your_zoom_client_id
   ZOOM_CLIENT_SECRET=your_zoom_client_secret
   ZOOM_ACCOUNT_ID=your_zoom_account_id
   MONGO_URI=your_mongodb_connection_string
   ```


2. The API will be available at `http://localhost:5000`.

## API Endpoints
- **POST /api/meeting**: Create a new Zoom meeting.

### Create a Zoom Meeting
**Endpoint**: `POST /api/meeting`

**Request Body**:
```json
{
  "topic": "Meeting Topic",
  "start_time": "2023-06-05T10:00:00Z",
  "duration": 60,
  "agenda": "Meeting Agenda"
}
```

**Response**:
- `200 OK` on success:
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Meeting is created successfully",
    "data": {
      "id": "meeting_id",
      "topic": "Meeting Topic",
      "start_time": "2023-06-05T10:00:00Z",
      "duration": 60,
      "agenda": "Meeting Agenda",
      // Other meeting details
    }
  }
  ```
- `400 Bad Request` if there's an error in creating the meeting:
  ```json
  {
    "success": false,
    "status": 400,
    "message": "Error, In creating the meeting",
    "data": {}
  }
  ```
- `500 Internal Server Error` if an internal error occurs:
  ```json
  {
    "success": false,
    "status": 500,
    "error": "Internal server error",
    "message": "An error message"
  }
  ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file according to your project's specifics. If you have any questions or need further assistance, don't hesitate to reach out.
