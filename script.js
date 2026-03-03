const JSON_URL = 'https://saadcc743-dev.github.io/Toolpromptbox/prompts.json';

async function generatePrompt(promptId, displayId, copyBtnId) {
    const display = document.getElementById(displayId);
    const copyBtn = document.getElementById(copyBtnId);
    
    display.textContent = "Connecting to library...";
    
    try {
        const response = await fetch(JSON_URL);
        const data = await response.json();
        const fullText = data[promptId];

        if (!fullText) {
            display.textContent = "Error: Prompt ID not found.";
            return;
        }

        display.textContent = "";
        let currentPos = 0;
        const totalDuration = 6000; // 6 seconds
        const speed = totalDuration / fullText.length;

        const timer = setInterval(() => {
            if (currentPos < fullText.length) {
                display.textContent += fullText.charAt(currentPos);
                currentPos++;
            } else {
                clearInterval(timer);
                copyBtn.disabled = false;
            }
        }, speed);

    } catch (error) {
        display.textContent = "Error loading library.";
    }
}

function copyPrompt(displayId, btnId) {
    const text = document.getElementById(displayId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById(btnId);
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = originalText; }, 2000);
    });
}
