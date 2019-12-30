<template>
  <div class="container">
    <div class="login-title">
      <h2>Login to Your Account</h2>
    </div>
    <div class="login-form">
      <div class="form-button-row">
        <a
          href="http://localhost:80/api/v2/okta_sso/sso"
          class="signin-button btn btn-primary"
        >Sign in with okta</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100%;
        height: auto;
        margin: 50px auto 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .login-title {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .login-title > h2 {
        font-size: $block-header-size;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.36;
        letter-spacing: normal;
        color: $darkest-blue;
        margin: 0;
    }

    .login-form {
        width: auto;
        height: auto;
        background-color: #ffffff;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
    }

    .form-button-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 40px;
    }

    .signin-button {
        color: $white !important;
    }

    .signin-button:hover {
        text-decoration: none;
        color: $white;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }

</style>
