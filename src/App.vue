<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      this.$store.dispatch('getContacts', 'https://jsonplaceholder.typicode.com/users?limit=10');
    }
  }
</script>

<style lang="scss">
  $block-bg: #212121;
  $primary-color: #3d8bd6;
  $breakpoints: (
    576px: 540px,
    768px: 720px,
    992px: 960px,
    1200px: 1140px
);
  body {
    margin: 0;
    scroll-behavior: smooth;
    background-color: #181818;
    color: #fff;
    font-family: sans-serif;
    a {
      color: #fff;
      text-decoration: none;
    }
    button {
      cursor: pointer;
      color: #fff;
      background-color: transparent;
      border: none;
      &:focus {
         outline: none;
      }
    }
    .remove-btn {
      padding: 10px 15px;
      font-size: 20px;
      color: red;
      transition: .2s all;
      &:hover {
        background-color: lighten($block-bg, 5%);
      }
    }
    #app {
      .container {
        margin: 30px auto auto;
        @each $breakpoint, $size in $breakpoints {
          @media(min-width: $breakpoint) {
            max-width: $size;
          }
        }
      }
      form {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        padding: 30px 50px;
        margin: 0 auto 20px auto;
        border-radius: 4px;
        background-color: $block-bg;
        input {
          width: 100%;
          box-sizing: border-box;
          background-color: transparent;
          outline: none;
          border: none;
          border-bottom: 1px solid $primary-color;
          color: #fff;
          height: 30px;
          /* Change the white to any color */
          &:-webkit-autofill,
          &:-webkit-autofill:hover,
          &:-webkit-autofill:focus,
          &:-webkit-autofill:active  {
            -webkit-box-shadow: 0 0 0 30px #212121 inset !important;
            -webkit-text-fill-color: white !important;
          }
        }
        [type="submit"] {
          margin: 20px auto 0 auto;
          padding: 8px 15px;
          font-size: 17px;
          cursor: pointer;
          background-color: $primary-color;
          border: none;
          color: #fff;
        }
      }
      .contact-card {
        background-color: $block-bg;
        border-radius: 4px;
        max-width: 600px;
        margin: 10px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .avatar {
          flex: 0 0 25%;
          a {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            height: 70px;
            width: 70px;
            border-radius: 50%;
            text-shadow: 1px 1px 3px #000;
            font-size: 28px;
          }
        }
        .contact-data {
          flex: 1 1 auto;
          i {
            font-size: 14px;
            color: $primary-color;
          }
        }
        .actions {
          flex: 0 0 15%;
          text-align: center;
        }
      }
    }
  }
</style>