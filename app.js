const $ = id => document.getElementById(id);
const generate = $("generate");
const result = $("result");
const status = $("status");

generate.addEventListener("click", async () => {
  const topic = $("topic").value.trim();
  if (!topic) {
    status.textContent = "Enter a topic first.";
    $("topic").focus();
    return;
  }

  generate.classList.add("busy");
  generate.textContent = "Generating...";
  status.textContent = "Writing your script...";
  result.textContent = "Please wait...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        topic,
        genre: $("genre").value,
        platform: $("platform").value,
        duration: $("duration").value,
        style: $("style").value,
        characters: $("characters").value.trim()
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Generation failed");
    result.textContent = data.script;
    status.textContent = "Done ✓";
  } catch (err) {
    result.textContent = "Something went wrong.";
    status.textContent = err.message;
  } finally {
    generate.classList.remove("busy");
    generate.textContent = "✦ Generate Script";
  }
});

$("copy").addEventListener("click", async () => {
  const text = result.textContent;
  if (!text || text === "Your generated script will appear here.") return;
  await navigator.clipboard.writeText(text);
  $("copy").textContent = "Copied ✓";
  setTimeout(() => $("copy").textContent = "Copy", 1400);
});