async function loadSpots() {

  const response = await fetch("data/spots.json");

  const spots = parseSpots(await response.text());

  setupMarkers(spots);

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

function parseSpots(jsonText) {

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    const fixedJsonText = jsonText.replace(
      /("description"\s*:\s*"[^"\r\n]*),(\r?\n\s*"image"\s*:)/g,
      '$1",$2'
    );

    return JSON.parse(fixedJsonText);
  }

}

function setupMarkers(spots) {

  const spotsById = new Map(spots.map(spot => [String(spot.id), spot]));

  document.querySelectorAll(".marker[data-spot-id]").forEach(marker => {

    const spot = spotsById.get(marker.dataset.spotId);

    if (!spot || !spot.mapUrl) {
      return;
    }

    marker.href = spot.mapUrl;
    marker.target = "_blank";
    marker.rel = "noopener";

    marker.setAttribute("aria-label", `Open spot ${spot.id} in Google Maps`);

  });

}

loadSpots();
