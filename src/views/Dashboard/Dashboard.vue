<template>
  <AppContent>
    <MessageBox
      v-if="pedidos"
      :messageBox="message_remove_wish"
      v-show="message_remove_wish"
    />
    <MessageBox
      v-if="pedidos"
      :messageBox="message_update_wish"
      v-show="message_update_wish"
    />

    <div class="dashboard" v-if="pedidos" v-show="pedidos">
      <div class="dashboard___box" v-for="pedido in pedidos" :key="pedido.id">
        <div class="box__head">
          <p>PEDIDO Nº: 000{{ pedido.id }} - Data: {{ date }}</p>

          <div class="box__head-buttons">
            <select
              name="status"
              class="status"
              @change="updatePedido($event, pedido.id)"
            >
              <option
                :value="statu.tipo"
                v-for="statu in status"
                :key="statu.id"
                :selected="pedido.status == statu.tipo"
              >
                {{ statu.tipo }}
              </option>
            </select>

            <Button
              name="Finalizar"
              symbol="trash"
              @click="deletePedido(pedido.id)"
            />
          </div>
        </div>

        <!--cliente -->
        <div class="box__client">
          <p>CLIENTE: {{ pedido.nome }}</p>
          <p>TELEFONE: {{ pedido.telefone }}</p>
          <p>ENDEREÇO: {{ pedido.endereco }}</p>
          <p>BAIRRO: {{ pedido.bairro }}</p>
        </div>

        <div class="box__producto-text">PÃO: {{ pedido.pao }}</div>

        <ul class="box__producto-list">
          CARNE:
          <li v-for="(carne, index) in pedido.carnes" :key="index">
            {{ carne }} |
          </li>
        </ul>

        <ul class="box__producto-list">
          OPCIONAIS:
          <li v-for="(opcional, index) in pedido.opcionais" :key="index">
            {{ opcional }} |
          </li>
        </ul>

        <div class="box__producto-text">BATATA: {{ pedido.batata }}</div>
        <div class="box__producto-text">BEBIDA: {{ pedido.bebida }}</div>

        <ul class="box__producto-list">
          TIPO DE BEBIDA:
          <li v-for="(tipoBebida, index) in pedido.tipoBebidas" :key="index">
            {{ tipoBebida }} |
          </li>
        </ul>

        <div class="box__producto-text">SORVETE: {{ pedido.sorvete }}</div>
      </div>
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
import Button from "@/components/shared/Button";
import ErrorServidorContent from "@/components/shared/ErrorServidorContent.vue";
import { ref } from "vue";
import { onBeforeMount } from "@vue/runtime-core";

const pedido_id = ref(null);
const pedidos = ref(true);
const status = ref([]);
const date = ref(null);
const message_remove_wish = ref(null);
const message_update_wish = ref(null);
const message_server_error = ref(null);

//Resposta do banco com inserção do dados:
async function getPedidos() {
  try {
    const req = await fetch(
      // "https://api-data-make-your-wish.herokuapp.com/pedidos"
      "http://localhost:3000/pedidos"
    );
    const data = await req.json();
    pedidos.value = data;

    if (data == false) {
      msg_pedido.value = "Não há pedidos em aberto no momento.";
    }

    //Date
    const dateContent = new Date();
    const day = String(dateContent.getDate()).padStart(2, "0");
    const month = String(dateContent.getMonth() + 1).padStart(2, "0");
    const year = dateContent.getFullYear();
    const dateToday = day + "/" + month + "/" + year;
    date.value = dateToday;

    getStatus();
  } catch (err) {
    pedidos.value = false;
    message_server_error.value = true;
    console.log(`Deu erro no acesso ao servidor` + err);
  }
}

// Status de pedidos:
async function getStatus() {
  try {
    const req = await fetch(
      // "https://api-data-make-your-wish.herokuapp.com/status"
      "http://localhost:3000/status"
    );
    const data = await req.json();
    status.value = data;
  } catch (err) {
    message_server_error.value = true;
    console.log(`Deu erro no acesso ao servidor: STATUS DO PEDIDO ` + err);
  }
}

//Deletar pedido:
async function deletePedido(id) {
  try {
    const req = await fetch(
      // `https://api-data-make-your-wish.herokuapp.com/pedidos/${id}`,
      `http://localhost:3000/pedidos/${id}`,
      {
        method: "DELETE",
      }
    );

    //msg pedido removido
    const res = await req.json();
    message_remove_wish.value = `Pedido removido com sucesso.`;
    setTimeout(() => (message_remove_wish.value = ""), 3000);
    console.log(res);

    // Resgata dados atualizados no banco de dados:
    getPedidos();
  } catch (err) {
    message_server_error.value = true;
    console.log(`Deu erro no acesso ao servidor: DELETAR PEDIDO ` + err);
  }
}

//Atualiza dados
async function updatePedido(event, id) {
  try {
    const option = event.target.value;
    const dataJson = JSON.stringify({ status: option });
    const req = await fetch(
      // `https://api-data-make-your-wish.herokuapp.com/pedidos/${id}`,
      `http://localhost:3000/pedidos/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      }
    );
    //mensagem pedido atualizado
    const res = await req.json();
    message_update_wish.value = `Pedido atualizado Nº ${res.id} com sucesso para ${res.status}.`;
    setTimeout(() => (message_update_wish.value = ""), 3000);
  } catch (err) {
    message_server_error.value = true;
    console.log(`Deu erro no acesso ao servidor: ATUALIZA PEDIDO ` + err);
  }
}

onBeforeMount(async() => {
  getPedidos();
});
</script>


<style lang="scss" scoped>
.dashboard {
  font-size: 1rem;
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 1rem;

  &___box {
    line-height: 2rem;

    .box__head {
      display: flex;
      align-items: center;
      justify-content: space-between;

      border-top: 0.3rem solid var(--border-color-2);
      font-weight: bolder;
      margin-top: 1rem;
      padding: 0 1rem;

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 0.1rem dashed var(--border-color-2);
        height: 2rem;
        margin: 0.5rem 0;
        width: auto;
      }

      &-buttons {
        display: flex;
        margin: 1rem 0 0.5rem 0;

        select {
          margin-right: 1rem;
          width: 8rem;
          padding: 0 0.5rem;
        }
      }
    }

    .box__client {
      font-weight: bold;
      padding: 0 1rem;
    }

    .box__producto-text {
      display: flex;
      flex-direction: row;

      border-top: 0.1rem dashed var(--border-color-3);
      padding: 0 1rem;
    }

    .box__producto-list {
      display: flex;
      flex-wrap: wrap;
      border-top: 0.1rem dashed var(--border-color-3);
      padding: 0 1rem;

      li {
        list-style: none;
        padding-left: 0.5rem;
      }
    }
  }
}

@media (max-width: 762px) {
  .dashboard {
    font-size: 0.8rem;

    &___box {
      line-height: 1.5rem;

      .box__head {
        display: block;

        p {
          width: 14.5rem;
        }

        &-buttons {
          p {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>