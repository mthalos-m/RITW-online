document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("protocol-gallery");

    protocols.forEach(protocol => {
        const card = document.createElement("article");
       card.innerHTML = `
    <div class="protocol-meta">Protocol ${protocol.id}</div>

    <h2>${protocol.title}</h2>

    <figure>
        <img src="${protocol.image}" alt="${protocol.title}">
        <figcaption>${protocol.description}</figcaption>
    </figure>

    <small>Page ${protocol.page}</small>
`;
        gallery.appendChild(card);
    });
});