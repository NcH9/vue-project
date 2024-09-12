<script type="module">
export default {
  name: 'Home',
}
</script>

<template>
  <main>
    <div class="grid">
      <h1 class="flex-center">Main page</h1>
      <p class="flex-center"><a href="https://fakestoreapi.com/">fakestore api</a> production</p>
      <img src="https://i.ytimg.com/vi/Z9bNysDAHac/maxresdefault.jpg">
    </div>
  </main>
</template>

<style scoped>
img{
  display: flex;
  justify-content: center;
  max-width: 640px;
  max-height: 360px;
  border-radius: 50%;
}
.grid {
  display: grid;
  place-items: center;
}
.flex-center{
  display: flex;
  justify-content: center;
  place-items: center;
}
</style>
