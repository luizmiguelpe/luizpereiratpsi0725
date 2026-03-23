const formulario = document.getElementById("meuFormulario");
const msgSucesso = document.getElementById("mensagemSucesso");
const btnEnviar = document.getElementById("botaoEnviar");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  btnEnviar.disabled = true;
  btnEnviar.innerText = "Enviando...";

  const dados = new FormData(formulario);

  try {
    const response = await fetch(formulario.action, {
      method: "POST",
      body: dados,
      headers: { accept: "application/json" },
    });

    if (response.ok) {
      msgSucesso.classList.remove("d-none");
      formulario.reset();
      btnEnviar.innerText = "Enviado!";
    } else {
      alert("Ops! Algo errado ao enviar.");
      btnEnviar.disabled = false;
      btnEnviar.innerText = "Enviar ✨";
    }
  } catch (error) {
    alert("Erro de conexão. Verifique sua internet.");
    btnEnviar.disabled = false;
    btnEnviar.innerText = "Enviar ✨";
  }
});
