chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GENERATE") {
    fetch("https://your-app.com/api/generate/answers", {
      method: "POST",
      body: JSON.stringify(request.data)
    })
    .then(r => r.json())
    .then(sendResponse);
    return true;
  }
});
