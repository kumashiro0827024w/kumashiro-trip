async function loadSpots() {

  const response = await fetch("data/spots.json");

  const spots = await response.json();

  const container = document.getElementById("spot-container");

  spots.forEach(spot => {

    const card = document.createElement("div");

    card.className = "spot-card";

    card.innerHTML = `
      <img class="spot-image" src="${spot.image}" alt="${spot.name}">

      <div class="spot-content">

        <div class="spot-title">
          ${spot.id}. ${spot.name}
        </div>

        <div class="spot-description">
          ${spot.description}
        </div>

        <a
          class="map-button"
          href="${spot.mapUrl}"
          target="_blank"
        >
          Google Mapで開く
        </a>

      </div>
    `;

    container.appendChild(card);

  });

}

loadSpots();