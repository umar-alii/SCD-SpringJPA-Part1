# Guide for Testing Hospital Appointment API

This is an appointment system rather than a hospital management system. Here are the URLs and request bodies to test your API:

## 1. Get All Appointments
- **URL:** http://localhost:8080/api/hospitals/getall
- **Method:** GET
- **Description:** Retrieves a list of all hospital appointments.

## 2. Get Appointment by ID
- **URL:** http://localhost:8080/api/hospitals/getbyid/1
- **Method:** GET
- **Description:** Retrieves a specific appointment by its ID (replace "1" with the actual appointment ID).

## 3. Book Appointment
- **URL:** http://localhost:8080/api/hospitals/bookappointment
- **Method:** POST
- **Headers:** Content-Type: application/json
- **Request Body Example:**
```json
{
  "patientName": "Umar Ali",
  "doctorName": "Dr Sohaib Ubaid",
  "appointmentDate": "2025-03-15T14:30:00",
  "status": "SCHEDULED"
}
```
- **Description:** Creates a new appointment record.

## 4. Update Appointment Status
- **URL:** http://localhost:8080/api/hospitals/updatestatus/1/COMPLETED
- **Method:** PATCH
- **Description:** Updates the status of an appointment with the specified ID (replace "1" with the actual appointment ID and "COMPLETED" with the desired status like "CANCELED", "RESCHEDULED", etc.).

## 5. Delete Appointment
- **URL:** http://localhost:8080/api/hospitals/delete/1
- **Method:** DELETE
- **Description:** Deletes the appointment with the specified ID (replace "1" with the actual appointment ID you want to delete).

## Testing with Different Status Values
You can use different status values when updating appointments:
- SCHEDULED
- CONFIRMED
- IN_PROGRESS
- COMPLETED
- CANCELED
- RESCHEDULED
- NO_SHOW

## Tips for Testing
1. The LocalDateTime format in the JSON request should follow the given format: `YYYY-MM-DDThh:mm:ss`
2. The default status for new appointments is "SCHEDULED" if not specified
3. When testing with Postman, remember to set the Content-Type header to application/json for POST requests

