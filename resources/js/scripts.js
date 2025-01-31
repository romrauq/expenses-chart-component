(() => {
	window.addEventListener("load", () => {
		fetch("./resources/data/data.json")
			.then((response) => response.json())
			.then((data) => {
				const chartContainer = document.querySelector(".week-chart");

				data.forEach((entry) => {
					// Create the day column
					const dayColumn = document.createElement("div");
					dayColumn.classList.add("day-column");

					// Create the bar
					const bar = document.createElement("div");
					bar.classList.add("bar");
					bar.style.height = `${entry.amount * 3}px`; // Scale height
					bar.dataset.amount = `$${entry.amount.toFixed(2)}`;

					// Create the day label
					const dayLabel = document.createElement("p");
					dayLabel.classList.add("day");
					dayLabel.textContent = entry.day;

					// Append elements
					dayColumn.appendChild(bar);
					dayColumn.appendChild(dayLabel);
					chartContainer.appendChild(dayColumn);

					// Click event for tooltip
					bar.addEventListener("click", (event) => {
						showTooltip(event.target);
					});
				});

				// Function to show tooltip
				function showTooltip(barElement) {
					// Remove existing tooltips
					document.querySelectorAll(".tooltip").forEach((tooltip) => tooltip.remove());

					// Create tooltip
					const tooltip = document.createElement("div");
					tooltip.classList.add("tooltip");
					tooltip.textContent = barElement.dataset.amount;

					// Position tooltip
					tooltip.style.position = "absolute";
					tooltip.style.color = "#fff";
					tooltip.style.fontFamily = "DM Sans";
					tooltip.style.fontWeight = "700";
					tooltip.style.fontSize = "12px";
					tooltip.style.padding = "5px 5px";
					tooltip.style.background = "hsl(25, 47%, 15%)";
					tooltip.style.borderRadius = "5px";
					tooltip.style.top = `${barElement.offsetTop - 30}px`;
					tooltip.style.left = `${barElement.offsetLeft + barElement.offsetWidth / 2 - 25}px`;

					// Append to chart
					document.body.appendChild(tooltip);
				}

				// Hide tooltip when clicking elsewhere
				document.addEventListener("click", (event) => {
					if (!event.target.classList.contains("bar")) {
						document.querySelectorAll(".tooltip").forEach((tooltip) => tooltip.remove());
					}
				});
			})
			.catch((error) => console.error("Error:", error));
	});
})();
