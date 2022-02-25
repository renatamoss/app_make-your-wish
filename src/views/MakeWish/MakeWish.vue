<template>
  <AppContent>
    <MessageBox :messageBox="messageMakeWish" v-show="messageMakeWish" />

    <div v-if="produtos" v-show="produtos">
      <form class="make-wish" method="POST" @submit.prevent="onSubmitCreatWish">
        <div class="make-wish__form-box">
          <div class="make-wish__form-box-columm">
            <FormFieldText
              label="CLIENTE*"
              type="text"
              v-model="nome"
              placeholder="Digite o nome completo"
              @click="clearMessageError"
              autofocus
            />
            <div class="message__error--fields" v-show="message_error_name">
              Campo inválido, digite o nome completo.
            </div>

            <FormFieldText
              label="Telefone*"
              type="number"
              v-model="telefone"
              placeholder="Digite o telefone com DDD"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_phone">
              Campo inválido, digite o telefone com DDD.
            </div>

            <FormFieldText
              label="Endereço de Entrega*"
              type="text"
              v-model="endereco"
              placeholder="Digite a Rua e Número"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_adress">
              Campo inválido, digite a Rua e Número.
            </div>

            <FormFieldText
              label="Bairro*"
              type="text"
              v-model="bairro"
              placeholder="Digite o Bairro"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_district">
              Campo inválido, digite o Bairro.
            </div>
          </div>

          <div class="make-wish__form-box-columm">
            <FormFieldOption
              nameProducto="HAMBURGUER"
              descriptionOption="Selecione o tipo de pão"
              v-model="pao"
              :productos="paes"
            />

            <FormFieldCheckbox nameProducto="Tipos de Carnes:">
              <div
                class="list-checkbox"
                v-for="carne in carnesdata"
                :key="carne.id"
              >
                <input
                  type="checkbox"
                  name="carnes"
                  v-model="carnes"
                  :value="carne.tipo"
                />
                <span>{{ carne.tipo }}</span>
              </div>
            </FormFieldCheckbox>

            <FormFieldCheckbox nameProducto="Recheios opcionais:">
              <div
                class="list-checkbox"
                v-for="opcional in opcionaisdata"
                :key="opcional.id"
              >
                <input
                  type="checkbox"
                  name="opcionais"
                  v-model="opcionais"
                  :value="opcional.tipo"
                />
                <span>{{ opcional.tipo }}</span>
              </div>
            </FormFieldCheckbox>
          </div>

          <div class="make-wish__form-box-columm">
            <FormFieldOption
              nameProducto="BATATA PALITO"
              descriptionOption="Selecione o tamanho da batata"
              v-model="batata"
              :productos="batatas"
            />

            <FormFieldOption
              nameProducto="BEBIDA"
              descriptionOption="Selecione o tipo de bebida"
              v-model="bebida"
              :productos="bebidas"
            />

            <FormFieldCheckbox nameProducto="Preferência de bebida:">
              <div
                class="list-checkbox"
                v-for="tipoBebida in tipoBebidasData"
                :key="tipoBebida.id"
              >
                <input
                  type="checkbox"
                  name="opcionais"
                  v-model="tipoBebidas"
                  :value="tipoBebida.tipo"
                />
                <span>{{ tipoBebida.tipo }}</span>
              </div>
            </FormFieldCheckbox>

            <FormFieldOption
              nameProducto="SORVETE"
              descriptionOption="Escolha de sorvete"
              v-model="sorvete"
              :productos="sorvetes"
            />
          </div>
        </div>

        <div class="register__required">*Campos obrigatórios.</div>

        <Button name="Cadastrar" symbol="pencil-square" />
      </form>
    </div>

    <div v-else v-show="message_server_error">
      <ErrorServidorContent
        message_server_error="Sistema indisponível no momento, tente novamente mais tarde."
      />
    </div>
  </AppContent>
</template>

<script setup>
import AppContent from "@/components/templates/AppContent";
import MessageBox from "@/components/shared/MessageBox";
import FormFieldText from "@/components/shared/Form/FormFieldText";
import FormFieldOption from "@/components/shared/Form/FormFieldOption";
import FormFieldCheckbox from "@/components/shared/Form/FormFieldCheckbox";
import Button from "@/components/shared/Button";
import ErrorServidorContent from "@/components/shared/ErrorServidorContent.vue";
import { onBeforeMount, ref } from "vue";

const nome = ref("");
const telefone = ref("");
const endereco = ref("");
const bairro = ref("");

//trás da api para preencher na home
const paes = ref("");
const batatas = ref("");
const bebidas = ref("");
const sorvetes = ref("");
const carnesdata = ref([]);
const opcionaisdata = ref([]);
const tipoBebidasData = ref([]);

//v-model, envia para api
const produtos = ref(true);
const pao = ref("");
const batata = ref("");
const bebida = ref("");
const sorvete = ref("");
const carnes = ref([]);
const opcionais = ref([]);
const tipoBebidas = ref([]);
const status = ref("Solicitado");
const messageMakeWish = ref(null);

//Validade fields
const message_error_name = ref(null);
const message_error_phone = ref(null);
const message_error_adress = ref(null);
const message_error_district = ref(null);
const message_server_error = ref(null);

const onSubmitCreatWish = () => {
  if (
    validateName() &&
    validatePhone() &&
    validateAdress() &&
    validateDistrict()
  ) {
    createWish();
  }
};

//Validates:
const validateName = () => {
  if (
    /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?!.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,30}$/.test(
      nome.value
    )
  ) {
    return true;
  } else {
    message_error_name.value = true;
  }
};

const validatePhone = () => {
  if (
    /^(?!.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?=.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,14}$/.test(
      telefone.value
    )
  ) {
    return true;
  } else {
    message_error_phone.value = true;
  }
};

const validateAdress = () => {
  if (
    /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?=.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,30}$/.test(
      endereco.value
    )
  ) {
    return true;
  } else {
    message_error_adress.value = true;
  }
};

const validateDistrict = () => {
  if (
    /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?!.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,20}$/.test(
      bairro.value
    )
  ) {
    return true;
  } else {
    message_error_district.value = true;
  }
};

const clearMessageError = () => {
  message_error_name.value = false;
  message_error_phone.value = false;
  message_error_adress.value = false;
  message_error_district.value = false;
};

//método chamado no mounted()
async function getPedidos() {
  //trazendo os dados da api, transformando em json:
  try {
    const req = await fetch(
      // "https://api-data-make-your-wish.herokuapp.com/produtos"
      "http://localhost:3000/produtos"
    );

    const data = await req.json();

    paes.value = data.paes;
    batatas.value = data.batatas;
    bebidas.value = data.bebidas;
    sorvetes.value = data.sorvetes;

    //arrays:
    carnesdata.value = data.carnes;
    tipoBebidasData.value = data.tipoBebidas;
    opcionaisdata.value = data.opcionais;
  } catch (err) {
    produtos.value = false;
    message_server_error.value = true;
    console.log(`Erro na resposta do servidor` + err);
  }
}

//submite formulário
async function createWish() {
  try {
    //dados preenchidos no formulário:
    const data = {
      nome: nome.value,
      telefone: telefone.value,
      endereco: endereco.value,
      bairro: bairro.value,

      pao: pao.value,
      batata: batata.value,
      bebida: bebida.value,
      sorvete: sorvete.value,

      //arrays:
      carnes: Array.from(carnes.value),
      opcionais: Array.from(opcionais.value),
      tipoBebidas: Array.from(tipoBebidas.value),

      status: "Solicitado",
    };

    //transformado os dados objetos data em JSON(texto):
    const dataJson = await JSON.stringify(data);

    //fazendo a requisição, INSERINDO os dados no servidor: POST:
    const req = await fetch(
      // "https://api-data-make-your-wish.herokuapp.com/pedidos",
      "http://localhost:3000/pedidos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      }
    );

    //resposta do banco com inserção do dados:
    const res = await req.json();

    //msg finalização pedido, chamando dentro do método:
    messageMakeWish.value = `Pedido Nº. ${res.id} realizado com sucesso!`;

    // clear message após time
    setTimeout(() => (messageMakeWish.value = ""), 3000);

    // limpar campos
    nome.value = "";
    telefone.value = "";
    endereco.value = "";
    bairro.value = "";

    pao.value = "";
    batata.value = "";
    bebida.value = "";
    sorvete.value = "";

    //arrays:
    carnes.value = [];
    opcionais.value = [];
    tipoBebidas.value = [];
  } catch (err) {
    produtos.value = false;
    console.log(`Erro na resposta do servidor` + err);
  }
}

onBeforeMount(async () => {
  getPedidos();
});
</script>


<style lang="scss" scoped>
.make-wish__form-box {
  display: flex;

  &-columm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 33%;
    padding: 0 0.5rem;

    .message__error--fields {
      color: var(--message-error-color);
      padding-bottom: 0.5rem;
      margin-top: -0.5rem;
    }
  }

  .list-checkbox {
    display: flex;
    align-items: center;

    padding-top: 0.5rem;
    width: 50%;

    input {
      width: auto;
    }

    span {
      margin-left: 0.5rem;
      width: auto;
    }
  }
}

.register__required {
  margin-bottom: 1rem;
  text-align: center;
}

.message__error-request {
  color: var(--message-error-color);
  padding-top: 1rem;
  text-align: center;
}

@media (max-width: 1200px) {
  .make-wish__form-box {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .make-wish__form-box {
    font-size: 0.8rem;
  }
}
</style>