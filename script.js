/* const API_URL = "https://api.github.com/emojis";

async function handlePromise() {
  try {
    const response = await fetch(API_URL);

    // Ensure the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonValueData = await response.json();

    // Since jsonValueData is already a parsed JSON object, no need to parse it again
    // console.log(jsonValueData);

    // Example: Access a specific emoji from the parsed JSON object
    // Note: jsonValueData is an object with emoji names as keys
    // If you want to access a specific emoji, use the corresponding key, e.g., jsonValueData["grinning"]
    const emojiKeys = Object.keys(jsonValueData);
    // console.log(emojiKeys);
    const randomKeys = Math.floor(Math.random() * emojiKeys.length);
    if (emojiKeys.length > 1) {
      const emojiName = emojiKeys[randomKeys];
      const emojiImg = jsonValueData[emojiKeys[randomKeys]];
    } else {
      console.log("Not enough emojis in the response.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

handlePromise(); */

const API_URL = "https://api.github.com/emojis";

async function handlePromise() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonValueData = await response.json();

    const emojiContainer = document.getElementById("emoji-container");

    for (const [name, url] of Object.entries(jsonValueData)) {
      const emojiElement = document.createElement("div");
      emojiElement.className = "emoji";
      emojiElement.innerHTML = `<img src="${url}" alt="${name}" title="${name}">`;
      emojiElement.addEventListener("click", async () => {
        try {
          const imageResponse = await fetch(url);
          const blob = await imageResponse.blob();
          const clipboardItem = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([clipboardItem]);
          alert(`Copied ${name} image to clipboard!`);
        } catch (err) {
          console.error("Failed to copy image: ", err);
          alert("Failed to copy image. Please try again.");
        }
      });
      emojiContainer.appendChild(emojiElement);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

/* function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
} */

handlePromise();
