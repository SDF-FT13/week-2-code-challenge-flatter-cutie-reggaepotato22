// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");

    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                characterBar.appendChild(span);

                span.addEventListener("click", () => displayCharacterDetails(character));
            });

            const voteForm = document.getElementById("votes-form");

            voteForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const votesInput = document.getElementById("votes");
                const newVotes = parseInt(votesInput.value) || 0;

                voteCount.textContent = parseInt(voteCount.textContent) + newVotes;

                votesInput.value = "0";
            });

            const resetButton = document.getElementById("reset-btn");

            resetButton.addEventListener("click", () => {
                voteCount.textContent = "0";
            });
        })
        .catch(error => console.error("Error fetching characters:", error));

    function displayCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.style.display = "block";
        voteCount.textContent = character.votes;
    }
});
