// DOM Elements
const appointmentsList = document.getElementById('appointments-list');
const appointmentForm = document.getElementById('appointment-form');
const statusForm = document.getElementById('status-form');
const saveStatusBtn = document.getElementById('save-status');
const loadingIndicator = document.getElementById('loading');
const currentTimeEl = document.getElementById('current-time');

const statusModal = new bootstrap.Modal(document.getElementById('statusModal'));

function updateCurrentTime() {
    const now = new Date();
    currentTimeEl.textContent = now.toLocaleString();
}
updateCurrentTime();
setInterval(updateCurrentTime, 60000);

const API_URL = '/api/hospitals';

function loadAppointments() {
    showLoading(true);
    fetch(`${API_URL}/getall`)
        .then(response => response.json())
        .then(appointments => {
            renderAppointments(appointments);
            showLoading(false);
        })
        .catch(error => {
            console.error('Error loading appointments:', error);
            showLoading(false);
            alert('Failed to load appointments. Please try again.');
        });
}

function renderAppointments(appointments) {
    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
        appointmentsList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No appointments found</td>
            </tr>
        `;
        return;
    }

    appointments.forEach(appointment => {
        const row = document.createElement('tr');

        // Format date
        const date = new Date(appointment.appointmentDate);
        const formattedDate = date.toLocaleString();

        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctorName}</td>
            <td>${formattedDate}</td>
            <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary btn-action update-status" data-id="${appointment.id}">
                    Update Status
                </button>
                <button class="btn btn-sm btn-danger btn-action delete-appointment" data-id="${appointment.id}">
                    Delete
                </button>
            </td>
        `;

        appointmentsList.appendChild(row);
    });

    document.querySelectorAll('.update-status').forEach(button => {
        button.addEventListener('click', e => {
            const id = e.target.dataset.id;
            document.getElementById('appointment-id').value = id;
            statusModal.show();
        });
    });

    document.querySelectorAll('.delete-appointment').forEach(button => {
        button.addEventListener('click', e => {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this appointment?')) {
                deleteAppointment(id);
            }
        });
    });
}

appointmentForm.addEventListener('submit', e => {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const doctorName = document.getElementById('doctorName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    const appointment = {
        patientName,
        doctorName,
        appointmentDate,
        status: 'SCHEDULED'
    };

    fetch(`${API_URL}/bookappointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
            return response.json();
        })
        .then(data => {
            alert('Appointment booked successfully!');
            appointmentForm.reset();
            document.getElementById('list-tab').click();
            loadAppointments();
        })
        .catch(error => {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment. Please try again.');
        });
});

saveStatusBtn.addEventListener('click', () => {
    const id = document.getElementById('appointment-id').value;
    const status = document.getElementById('status').value;

    fetch(`${API_URL}/updatestatus/${id}/${status}`, {
        method: 'PATCH'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            return response.json();
        })
        .then(data => {
            statusModal.hide();
            alert('Appointment status updated successfully!');
            loadAppointments();
        })
        .catch(error => {
            console.error('Error updating status:', error);
            alert('Failed to update appointment status. Please try again.');
        });
});

function deleteAppointment(id) {
    fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete appointment');
            }
            alert('Appointment deleted successfully!');
            loadAppointments();
        })
        .catch(error => {
            console.error('Error deleting appointment:', error);
            alert('Failed to delete appointment. Please try again.');
        });
}

function showLoading(show) {
    if (show) {
        loadingIndicator.classList.remove('d-none');
    } else {
        loadingIndicator.classList.add('d-none');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    document.getElementById('appointmentDate').value = `${year}-${month}-${day}T${hours}:${minutes}`;
});