<template>
  <div class="navbar__logged">
    <div class="navbar__link">
      <router-link to="/MakeWish">
        <Icon symbol="pencil-square" />
        <p>Cadastrar</p>
      </router-link>
      <router-link to="/Dashboard">
        <Icon symbol="bi bi-card-checklist" />
        <p>Gerenciar</p>
      </router-link>
      <router-link to="/" @click.prevent="doLogout">
        <Icon symbol="bi bi-box-arrow-left" />
        <p>Logout</p>
      </router-link>
    </div>
    <div class="navbar__user">
      <Icon symbol="bi bi-person-circle" />
      <p class="navbar__user-name">{{ nameUser }}</p>
    </div>
  </div>
</template>


<script setup>
import Icon from "@/components/shared/Icon";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const doLogout = () => {
  store.commit("LOGOUT_USER");
};

const nameUser = computed({
  get: () => store.getters.nameUser,
});
</script>


<style lang="scss" scoped>
.navbar__logged {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.navbar__link,
.navbar__user {
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    display: flex;
    align-items: center;

    color: var(--text-color-2);
    font-size: 1.2rem;
    margin-left: 0.5rem;
    text-align: left;
    transition: 0.5s;
  }

  a {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
}

.navbar__user {
  margin-left: 1rem;
  margin-right: 1rem;

  &-name {
    color: white !important;
    margin-left: 0.5rem !important;
  }
}

@media (min-width: 768px) {
  .navbar__link p:hover {
    color: var(--text-color-1-hover);
  }
}

@media (max-width: 1200px) {
  .navbar__logged {
    justify-content: center;
    padding-top: 1rem;

    a,
    p {
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 576px) {
  .navbar__link a {
    margin-left: 0.5rem;
  }

  .navbar__user {
    margin-left: 0.5rem;
  }
}
</style>

