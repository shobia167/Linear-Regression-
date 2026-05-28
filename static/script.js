const btn = document.getElementById("predict-btn");
const input = document.getElementById("tv-budget");
const resultValue = document.getElementById("result-value");

btn.addEventListener("click", async () => {
    const tv = input.value.trim();

    if (tv === "") {
        resultValue.textContent = "Please enter a budget";
        return;
    }

    btn.textContent = "Predicting...";
    btn.disabled = true;

    try {
        const res = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tv: parseFloat(tv) })
        });

        const data = await res.json();
        resultValue.textContent = `${data.sales.toFixed(2)}`;
    } catch {
        resultValue.textContent = "Error predicting";
    } finally {
        btn.textContent = "Predict";
        btn.disabled = false;
    }
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btn.click();
});
