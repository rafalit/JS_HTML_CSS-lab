let points = 0;
let propagationStopped = false;

const log = document.getElementById("log");
const togglePropagationBtn = document.getElementById("togglePropagation");
const resetBtn = document.getElementById("reset");
const clearLogBtn = document.getElementById("clearLog");
const pointsDisplay = document.createElement("div");
const orderControls = document.getElementById("order-controls");
const orderRadios = document.querySelectorAll('input[name="order"]');

// Handlers for boxes
const boxes = document.querySelectorAll(".box");
const boxColors = {
    blue: { value: 1, active: true, color: "lightblue" },
    red: { value: 2, active: true, color: "lightcoral" },
    yellow: { value: 3, active: true, color: "lightyellow" },
};

// Update log
function logMessage(message) {
    const entry = document.createElement("div");
    entry.textContent = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

// Handle click
function handleClick(event) {
    const id = event.currentTarget.id;

    // Check if the box is active
    if (!boxColors[id].active) {
        event.stopPropagation(); // Prevent further propagation when the box is inactive
        return; // Completely ignore the click
    }

    const value = boxColors[id].value;
    points += value;

    logMessage(`+${value}`);
    pointsDisplay.textContent = `Total Points: ${points}`;

    // Disable boxes based on points thresholds
    if (points > 30 && boxColors.yellow.active) {
        boxColors.yellow.active = false;
        logMessage("Żółty wyłączony (suma > 30)");
    }

    if (points > 50 && boxColors.red.active) {
        boxColors.red.active = false;
        logMessage("Czerwony wyłączony (suma > 50)");
    }

    if (propagationStopped) {
        event.stopPropagation(); // Stop event from propagating further
    }
}

// Reset state
function reset() {
    points = 0;
    log.innerHTML = "Alerts:";
    pointsDisplay.textContent = `Total Points: ${points}`;
    Object.keys(boxColors).forEach(key => {
        boxColors[key].active = true;
    });

    const defaultOrderRadio = document.querySelector('input[name="order"][value="1-2-3"]');
    if (defaultOrderRadio) {
        defaultOrderRadio.checked = true;
        changeOrder();
    }

    orderControls.classList.remove("hidden");
}

// Clear log
function clearLog() {
    log.innerHTML = "Alerts:";
}

// Toggle propagation
function togglePropagation() {
    propagationStopped = !propagationStopped;
    togglePropagationBtn.textContent = propagationStopped ? "Start Propagation" : "Stop Propagation";
}

// Change order
function changeOrder() {
    const selectedOrder = [...orderRadios].find(radio => radio.checked).value;
    const orderMapping = {
        "1-2-3": [1, 2, 3],
        "3-2-1": [3, 2, 1],
        "2-3-1": [2, 3, 1],
        "1-3-2": [1, 3, 2],
    };

    const newValues = orderMapping[selectedOrder];

    Object.keys(boxColors).forEach((key, index) => {
        boxColors[key].value = newValues[index];
    });

    boxes.forEach((box, index) => {
        const id = box.id;
        box.querySelector(".label").textContent = `+${boxColors[id].value}`;
    });

    logMessage(`Order changed to: ${selectedOrder}`);
}

// Initialize points display
pointsDisplay.textContent = `Total Points: ${points}`;
document.querySelector(".controls").insertBefore(pointsDisplay, document.getElementById("togglePropagation"));

// Attach events
boxes.forEach(box => box.addEventListener("click", handleClick));
resetBtn.addEventListener("click", reset);
clearLogBtn.addEventListener("click", clearLog);
togglePropagationBtn.addEventListener("click", togglePropagation);
orderRadios.forEach(radio => radio.addEventListener("change", changeOrder));

// Set default propagation order on load
document.addEventListener("DOMContentLoaded", () => {
    const defaultOrderRadio = document.querySelector('input[name="order"][value="1-2-3"]');
    if (defaultOrderRadio) {
        defaultOrderRadio.checked = true;
        changeOrder();
    }

    orderControls.classList.remove("hidden");
});
