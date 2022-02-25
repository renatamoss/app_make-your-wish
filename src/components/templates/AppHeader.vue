<template>
  <nav class="navbar">
    <router-link class="navbar__logo" to="/">
      <img src="@/assets/images/logo-menu.png" alt="Logo Menu" />
      Make Your Wish
    </router-link>

    <NavbarLogged v-if="userLogged" />
    <NavbarLoggedOut v-else />
  </nav>
</template>


<script setup>
import NavbarLogged from "@/components/objects/Navbar/NavbarLogged";
import NavbarLoggedOut from "@/components/objects/Navbar/NavbarLoggedOut";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userLogged = computed({
  get: () => store.getters.userLogged,
});
</script>


<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--bg-color-1);
  height: auto;
  padding: 1rem 3rem;
  position: fixed;
  width: 100%;

  &__logo {
    display: flex;
    align-items: center;

    color: var(--title-color-2);
    font-family: "Homemade Apple", cursive;
    font-size: 2rem;

    img {
      width: 4rem;
      padding-right: 1rem;
    }
  }

  &__link {
    display: flex;

    a,
    p {
      display: flex;
      align-items: center;

      color: var(--text-color-2);
      font-size: 1.2rem;
      margin: 0 0.5rem;
      text-align: left;
      transition: 0.5s;
    }
  }
}

@media (min-width: 768px) {
  .navbar__link p:hover {
    color: var(--text-color-1-hover);
  }
}

@media (max-width: 1200px) {
  .navbar {
    display: block;
    height: 100%;
    position: relative;

    &__logo {
      font-size: 1.6rem;
      justify-content: center;
    }
    &__link {
      justify-content: center;
      padding-top: 1rem;
      text-align: center;
    }
    &__link a,
    &__link p {
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 992px) {
  .navbar {
    padding: 1rem;
  }
}
</style>




