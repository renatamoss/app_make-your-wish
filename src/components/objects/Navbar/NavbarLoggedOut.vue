<template>
    <div class="navbar__link">
      <router-link to="/">
        <Icon symbol="bi bi-box-arrow-in-right" />
        <p>Login</p>
      </router-link>
      <router-link to="/NewUser">
        <Icon symbol="bi bi-person-plus" />
        <p>Cadastrar</p>
      </router-link>
    </div>
</template>

<script setup>
import Icon from "@/components/shared/Icon";

</script>


<style lang="scss" scoped>
.navbar__link {
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

@media (min-width: 768px) {
  .navbar__link p:hover {
    color: var(--text-color-1-hover);
  }
}

@media (max-width: 1200px) {
  .navbar__link {
    justify-content: center;
    padding-top: 1rem;
    text-align: center;

    a,
    p {
      font-size: 0.8rem;
    }
  }
}
</style>
