import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "", // KEY
  dangerouslyAllowBrowser: true,
});

const TestePage = () => {
  const [input, setInput] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
  const mermaidRef = useRef(null);

  useEffect(() => {
    // Inicializa o Mermaid uma vez
    mermaid.initialize({ startOnLoad: false, theme: "dark" });

    if (resposta && mermaidRef.current) {
      // Limpa a resposta para remover blocos de código markdown
      const mermaidCode = resposta
        .replace(/```mermaid/g, "")  // remove abertura do bloco mermaid
        .replace(/```/g, "")         // remove fechamento do bloco
        .trim();                    // remove espaços em branco das extremidades

      const id = "mermaid-diagram";

      mermaid
        .render(id, mermaidCode)
        .then(({ svg }) => {
          mermaidRef.current.innerHTML = svg;
        })
        .catch((err) => {
          mermaidRef.current.innerHTML = `<pre style="color: red;">Erro ao renderizar Mermaid:\n${err.message}</pre>`;
        });
    }
  }, [resposta]);

  const enviarMensagem = async () => {
    setCarregando(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }],
      });
      setResposta(completion.choices[0].message.content);
    } catch (error) {
      setResposta("Erro ao gerar resposta.");
      console.error(error);
    }
    setCarregando(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 ChatGPT + Mermaid</h1>
      <textarea
        placeholder="Digite código Mermaid válido..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#1e1e1e",
          color: "white",
          marginBottom: "1rem",
          resize: "vertical",
        }}
      />
      <br />
      <button
        onClick={enviarMensagem}
        disabled={carregando}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: carregando ? "#555" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: carregando ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {carregando ? "Carregando..." : "Enviar"}
      </button>
      <div style={{ marginTop: "2rem" }}>
        <div ref={mermaidRef} />
      </div>
    </div>
  );
};

export default TestePage;
