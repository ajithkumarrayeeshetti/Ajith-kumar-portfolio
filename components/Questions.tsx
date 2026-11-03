"use client";
import { useState } from "react";

type Turn = { q: string; a?: string; failed?: boolean };
const starters = ["Which projects have you built?", "What is your tech stack?", "Where do you study?", "How do I contact you?"];

export default function Questions() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function ask(raw: string) {
    const q = raw.trim();
    if (!q || busy) return;
    const history = turns.filter((t) => t.a && !t.failed).slice(-4)
      .flatMap((t) => [{ role: "user", text: t.q }, { role: "bot", text: t.a as string }]);
    setTurns((prev) => [...prev, { q }]);
    setText("");
    setBusy(true);
    let a = "";
    let failed = false;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", text: q }] }),
      });
      const data = await res.json();
      a = data.reply || "No answer came back.";
      failed = !res.ok;
    } catch {
      a = "The request did not go through. Check your connection and try again.";
      failed = true;
    }
    setTurns((prev) => prev.map((t, i) => (i === prev.length - 1 ? { ...t, a, failed } : t)));
    setBusy(false);
  }

  return (
    <div className="questions">
      <p className="prose">
        Ask about my skills, projects or studies. An automated assistant answers from notes I wrote about my work, so confirm anything important by email.
      </p>
      <ul className="starters">
        {starters.map((s) => (<li key={s}><button onClick={() => ask(s)} disabled={busy}>{s}</button></li>))}
      </ul>
      <div className="log" aria-live="polite">
        {turns.map((t, i) => (
          <div className="turn" key={i}>
            <p className="q"><span className="mono">Q</span>{t.q}</p>
            <p className={`a${t.failed ? " err" : ""}`}><span className="mono">A</span>{t.a ?? "Checking my notes"}</p>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <label htmlFor="question" className="mono">Your question</label>
        <div className="row">
          <input id="question" value={text} onChange={(e) => setText(e.target.value)} maxLength={300} required autoComplete="off" />
          <button type="submit" disabled={busy}>{busy ? "Sending" : "Send question"}</button>
        </div>
      </form>
    </div>
  );
}
