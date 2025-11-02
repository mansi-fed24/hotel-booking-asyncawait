 const API_BASE =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://hotel-booking-asyncawait-project.onrender.com";
    
 
 async function getBookings() {
      try {
        const res = await fetch(`${API_BASE}/api/bookings`);
        const data = await res.json();
        bookingsData = data; 

        const table = document.getElementById("bookingsTable");
        table.innerHTML = "";

        if (data.length === 0) {
          table.innerHTML = "<tr><td colspan='8'>No bookings found</td></tr>";
          return;
        }

        data.forEach(b => {
          const row = `
            <tr>
              <td>${b.id}</td>
              <td>${b.room_type}</td>
              <td>${b.guest_name}</td>
              <td>${b.guest_email}</td>
              <td>${b.guest_phone}</td>
              <td>${new Date(b.start_date).toLocaleDateString()}</td>
              <td>${new Date(b.end_date).toLocaleDateString()}</td>
              <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editBooking(${b.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBooking(${b.id})">Delete</button>
              </td>

            </tr>
          `;
          table.insertAdjacentHTML("beforeend", row);
        });
      } catch (err) {
        console.error(err);
        document.getElementById("bookingsTable").innerHTML = "<tr><td colspan='8'>Error loading bookings</td></tr>";
      }
    }

    async function deleteBooking(id) {
      const confirmDelete = confirm("Delete this booking?");
      if (!confirmDelete) return;

      try {
        const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Booking deleted");
          getBookings();
        } else {
          alert("Failed to delete booking");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    }

    let bookingsData = []; // cache current list

    async function editBooking(id) {
        const booking = bookingsData.find(b => b.id === id);
        if (!booking) return alert("Booking not found");

        console.log("Room type:", booking.room_type); 
        
        // fill form fields
        document.getElementById("edit_id").value = booking.id;
        document.getElementById("edit_room").value = booking.room_type.trim();
        document.getElementById("edit_name").value = booking.guest_name;
        document.getElementById("edit_email").value = booking.guest_email;
        document.getElementById("edit_phone").value = booking.guest_phone;
        document.getElementById("edit_checkin").value = booking.start_date.split("T")[0];
        document.getElementById("edit_checkout").value = booking.end_date.split("T")[0];

        // show modal
        const modal = new bootstrap.Modal(document.getElementById("editModal"));
        modal.show();
    }

    // handle form submit
    document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();

        const id = document.getElementById("edit_id").value;
        const updated = {
            room_type: document.getElementById("edit_room").value,
            guest_name: document.getElementById("edit_name").value,
            guest_email: document.getElementById("edit_email").value,
            guest_phone: document.getElementById("edit_phone").value,
            start_date: document.getElementById("edit_checkin").value,
            end_date: document.getElementById("edit_checkout").value
        };

        try {
            const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
            });

            if (res.ok) {
            alert("Booking updated");
            const modalEl = bootstrap.Modal.getInstance(document.getElementById("editModal"));
            modalEl.hide();
            getBookings();
            } else {
            alert("Update failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    });



    getBookings();