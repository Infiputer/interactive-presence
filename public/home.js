const callButtons = [document.querySelector("#navCall"), document.querySelector("#heroCall"), document.querySelector("#footerCall")];
const ctaStatus = document.querySelector("#ctaStatus");
const agentCommand = document.querySelector("#agentCommand");
const copyAgentCommand = document.querySelector("#copyAgentCommand");

agentCommand.textContent = `Read ${location.origin}/SKILL.md and follow the instructions to start an Interactive Presence call with me.`;

copyAgentCommand.addEventListener("click", async () => {
  const text = agentCommand.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(agentCommand);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  }
  copyAgentCommand.querySelector("span").textContent = "Copied!";
  copyAgentCommand.classList.add("copied");
  setTimeout(() => {
    copyAgentCommand.querySelector("span").textContent = "Copy";
    copyAgentCommand.classList.remove("copied");
  }, 1800);
});

async function startQuickCall() {
  callButtons.forEach((button) => { button.disabled = true; });
  ctaStatus.textContent = "Creating your room…";
  try {
    const response = await fetch("/api/calls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Quick developer call",
        context: "This is an Interactive Presence homepage demo. No coding-agent context was supplied. Introduce Novo briefly and ask what development task the participant wants to work through.",
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not create the call");
    location.href = result.call_url;
  } catch (error) {
    ctaStatus.textContent = error.message;
    callButtons.forEach((button) => { button.disabled = false; });
  }
}

callButtons.forEach((button) => button.addEventListener("click", startQuickCall));
