(() => {
	window.addEventListener("load", () => {
		fetch("./resources/data/data.json") // Adjust the path if needed
			.then((response) => response.json())
			.then((data) => {
				const weekChart = document.querySelector(".week-chart");

				// Clear existing content (if any)
				weekChart.innerHTML = "";

				// Find the highest amount to scale the bar heights
				const maxAmount = Math.max(...data.map((item) => item.amount));

				// Loop through the data and create elements
				data.forEach((item) => {
					const dayColumn = document.createElement("div");
					dayColumn.classList.add("day-column");

					const bar = document.createElement("div");
					bar.classList.add("bar");
					bar.style.height = `${(item.amount / maxAmount) * 100}px`; // Scale height dynamically
					bar.title = `$${item.amount}`; // Tooltip with amount

					const dayLabel = document.createElement("p");
					dayLabel.classList.add("day");
					dayLabel.textContent = item.day;

					// Append bar and label to day column
					dayColumn.appendChild(bar);
					dayColumn.appendChild(dayLabel);

					// Append day column to week chart
					weekChart.appendChild(dayColumn);
				});
			})
			.catch((error) => console.error("Error:", error));
	});
})();
