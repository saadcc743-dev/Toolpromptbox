// Ensure this URL points to your actual JSON file on GitHub
const LIBRARY_URL = 'https://saadcc743-dev.github.io/Toolpromptbox/prompts.json';

async function generatePrompt(promptKey, displayId, copyBtnId) {
    const display = document.getElementById(displayId);
    const copyBtn = document.getElementById(copyBtnId);
    
    display.textContent = "Connecting to library...";
    copyBtn.disabled = true;

    try {
        const response = await fetch(LIBRARY_URL);
        const data = await response.json();
        const textToType = data[promptKey];

        if (!textToType) {
            display.textContent = "Error: ID not found.";
            return;
        }

        display.textContent = "";
        let i = 0;
        // Total time is 6000ms (6 seconds)
        const typingSpeed = 6000 / textToType.length;

        const typingInterval = setInterval(() => {
            if (i < textToType.length) {
                display.textContent += textToType.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                copyBtn.disabled = false;
            }
        }, typingSpeed);

    } catch (error) {
        display.textContent = "Error: Failed to load library.";
    }
}

function copyPrompt(displayId, btnId) {
    const text = document.getElementById(displayId).textContent;
    const btn = document.getElementById(btnId);
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = originalText; }, 2000);
    });
}
