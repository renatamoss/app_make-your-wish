<template>
  <AppContent>
    <form class="login" @submit.prevent="onSubmitLogin">
      <div class="login__form-field-group">
        <label for="email">E-mail:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Digite seu email"
          autofocus
          v-model="usuario.email"
          @click="clearErrorLogin"
        />
        <div class="message__error--user" v-show="message_error_email">
          Email inválido, utilize o email cadastrado ou vá para 'Cadastrar'.
        </div>
      </div>
      <div class="login__form-field-group">
        <label for="senha">Senha:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Digite sua senha"
          v-model="usuario.senha"
          @click="clearErrorLogin"
        />
        <div class="message__error--user" v-show="message_error_password">
          Senha não informada.
        </div>
      </div>

      <div class="message__error--request" v-show="message_error_request">
        Você digitou um login ou senha inválido(s). Tente novamente.
      </div>

      <ErrorServidorContent
        message_server_error="Sistema indisponível no momento, tente novamente mais tarde."
        v-show="message_server_error"
      />

      <Button name="Login" symbol="bi bi-box-arrow-in-right" />

      <router-link to="/NewUser">
        <p>Se você não possui cadastro, cadastre-se aqui!</p>
      </router-link>
    </form>
  </AppContent>
</template>


<script setup>
import AppContent from "@/components/templates/AppContent";
import Button from "@/components/shared/Button";
import ErrorServidorContent from "@/components/shared/ErrorServidorContent.vue";
import { ref, onBeforeMount } from "@vue/runtime-core";
import http from "@/http/index.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const usuario = ref({
  email: "",
  senha: "",
});
const message_error_password = ref(null);
const message_error_email = ref(null);
const message_error_request = ref(null);
const message_server_error = ref(null);

const onSubmitLogin = () => {
  if (validateEmail() && validatePassword()) {
    doLogin();
  }
};

//Validate Login
const validateEmail = () => {
  if (
    usuario.value.email !== "" &&
    usuario.value.email.indexOf("@") !== -1 &&
    usuario.value.email.indexOf(".") !== -1
  ) {
    return true;
  } else {
    message_error_email.value = true;
  }
};

const validatePassword = () => {
  if (usuario.value.senha !== "") {
    return true;
  } else {
    message_error_password.value = true;
  }
};

const clearErrorLogin = () => {
  message_error_email.value = false;
  message_error_password.value = false;
  message_error_request.value = false;
};

const doLogin = () => {
  //dispacth: chama uma action no store: doLoginStore
  store
    .dispatch("doLoginStore", usuario.value)

    .then(() => {
      router.push({ name: "Cadastrar Pedidos" });
    })
    .catch((error) => {
      if (error.request.status === 401) {
        message_error_request.value = true;
        usuario.value.email = "";
        usuario.value.senha = "";
      } else {
        message_server_error.value = true;
        usuario.value.email = "";
        usuario.value.senha = "";   
      }
    });
};

onBeforeMount(async () => {
  if (store.getters["userLogged"]) {
    router.push({ name: "Cadastrar Pedidos" });
  }
});
</script>


<style lang="scss" scoped>
.login {
  margin: 0 auto;
  max-width: 780px;

  &__form-field-group {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;

    label {
      border-left: 0.3rem solid var(--border-color-2);
      color: var(--text-color-1);
      font-weight: bold;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }

    input {
      background-color: var(--bg-color-2);
      padding: 0.5rem;
      width: 100%;
    }
  }

  p {
    color: var(--title-color-1);
    font-size: 1rem;
    margin: 1rem;
    text-align: center;
    text-decoration: underline;
    transition: 0.2s;
  }
  .message__error--user {
    color: var(--message-error-color);
    padding-top: 0.5rem;
  }

  .message__error--request,
  .message__error--offline {
    color: var(--message-error-color);
    padding: 0.5rem;
    margin: 0 auto 1rem auto;
    max-width: 50%;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .login p:hover {
    color: var(--text-color-3-hover);
  }
}

@media (max-width: 768px) {
  .login {
    &__form-field-group {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;

      label {
        margin-bottom: 0.5rem;
      }
    }
    p {
      font-size: 0.8rem;
    }
    .message__error {
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }
}
</style>