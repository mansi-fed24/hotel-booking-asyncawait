

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

    const message = document.getElementById("message");
  
  // Collect form data
  const booking = {
    room_type: document.getElementById("room_type").value,
    guest_name: document.getElementById("guest_name").value.trim(),
    guest_email: document.getElementById("guest_email").value.trim(),
    guest_phone: document.getElementById("guest_phone").value.trim(),
    start_date: document.getElementById("start_date").value,
    end_date: document.getElementById("end_date").value,
  };

   // 1. Validate phone (digits only)
  const phonePattern = /^[0-9]{8,15}$/; // allow 8–15 digits
  if (!phonePattern.test(booking.guest_phone)) {
    message.textContent = "Please enter a valid phone number (digits only).";
    message.style.color = "red";
    return;
  }

  // 2. Validate dates
  const today = new Date().toISOString().split("T")[0];
  const checkIn = booking.start_date;
  const checkOut = booking.end_date;

  if (checkIn < today) {
    message.textContent = "Check-in date cannot be in the past.";
   message.style.color = "red";
    return;
  }

  if (checkOut <= checkIn) {
    message.textContent = "Check-out date must be after check-in date.";
    message.style.color = "red";
    return;
  }

  // send data to backend
  try {
    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "Booking created successfully.";
      message.style.color = "green";
      document.getElementById("bookingForm").reset();

      // close modal after short delay
      setTimeout(() => {
        const modalEl = document.getElementById("bookingModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        message.textContent = "";
      }, 1500);
    } else {
      message.textContent = "Booking failed. Please try again.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Server not reachable. Please try again later.";
    message.style.color = "red";
  }
});

//open booking modal when "Book Now" in navbar is clicked
document.addEventListener("DOMContentLoaded", () => {
  const navBook = document.getElementById("nav-book");
  if (navBook) {
    navBook.addEventListener("click", (e) => {
      e.preventDefault();
      const modalEl = document.getElementById("bookingModal");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });
  }
});
