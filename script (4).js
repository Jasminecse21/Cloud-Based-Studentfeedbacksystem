const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function displayFeedbacks() {

    feedbackList.innerHTML = "";

    if (feedbacks.length === 0) {
        feedbackList.innerHTML =
            '<p class="empty">No feedback submitted yet.</p>';
        return;
    }

    feedbacks.forEach(function(feedback, index) {

        const feedbackItem = document.createElement("div");

        feedbackItem.className = "feedback-item";

        feedbackItem.innerHTML = `
            <h3>${feedback.facultyName}</h3>

            <p><strong>Student:</strong> ${feedback.studentName}</p>

            <p><strong>Register Number:</strong>
                ${feedback.registerNumber}
            </p>

            <p><strong>Department:</strong>
                ${feedback.department}
            </p>

            <p><strong>Subject:</strong>
                ${feedback.subject}
            </p>

            <p class="rating-text">
                Rating: ${feedback.rating}/5
            </p>

            <p><strong>Feedback:</strong>
                ${feedback.feedback}
            </p>
        `;

        feedbackList.appendChild(feedbackItem);
    });
}

feedbackForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value.trim();

    const registerNumber =
        document.getElementById("registerNumber").value.trim();

    const department =
        document.getElementById("department").value;

    const facultyName =
        document.getElementById("facultyName").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const rating =
        document.querySelector(
            'input[name="rating"]:checked'
        ).value;

    const feedback =
        document.getElementById("feedback").value.trim();

    const newFeedback = {
        studentName: studentName,
        registerNumber: registerNumber,
        department: department,
        facultyName: facultyName,
        subject: subject,
        rating: rating,
        feedback: feedback
    };

    feedbacks.push(newFeedback);

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );

    message.textContent =
        "Feedback submitted successfully!";

    message.style.color = "green";

    feedbackForm.reset();

    displayFeedbacks();
});

clearBtn.addEventListener("click", function() {

    if (feedbacks.length === 0) {
        return;
    }

    feedbacks = [];

    localStorage.removeItem("feedbacks");

    displayFeedbacks();

    message.textContent =
        "All feedback cleared.";

    message.style.color = "red";
});

displayFeedbacks();