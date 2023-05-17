const addressForm = document.querySelector("#address-form");
const nameForm = document.querySelector("#name-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

// Validar o CEP
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);

  console.log(key);

  console.log(onlyNumbers.test(key));

  // Apenas Numeros
  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }
});

// Pega o endereco
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  // Checa se CEP
  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Pega o endereço da API
const getAddress = async (cep) => {
  toggleLoader();

  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  console.log(data);
  console.log(formInputs);
  console.log(data.erro);

  // Mostra erro e reseta o formulario
  if (data.erro === "true") {
    if (!addressInput.hasAttribute("disabled")) {
      toggleDisabled();
    }

    addressForm.reset();
    toggleLoader();
    toggleMessage("CEP Inválido, tente novamente.");
    return;
  }

  // Ativa e desativa se o formulário for vazio
  if (addressInput.value === "") {
    toggleDisabled();
  }

  addressInput.value = data.logradouro;
  cityInput.value = data.localidade;
  neighborhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  toggleLoader();
};

// Adiciona ou remove atributo
const toggleDisabled = () => {
  if (regionInput.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
  }
};

// Mostra e esconde o icone de carregar
const toggleLoader = () => {
  const fadeElement = document.querySelector("#fade");
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
};

// Salva o endereço
addressForm.addEventListener("submit", (e) => {

  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    addressForm.reset();
    nameForm.reset();

    toggleDisabled();
  }, 1000);
});

function resetCampo() {
  document.getElementById("name-form").reset();
  document.getElementById("address-form").reset();
}