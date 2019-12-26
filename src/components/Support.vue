<template>
    <div class="container">
        <h2 class="page-logo">Support</h2>
        <div class="form-container">
            <form @submit.prevent="sendEmail">
                <div class="form-row">
                    <label for="name">Your name</label>
                    <input type="text" v-model="name" id="name" class="form-input" placeholder="John Doe" required>
                </div>
                <div class="form-row">
                    <label for="email">Your email</label>
                    <input type="email" v-model="email" id="email" class="form-input" placeholder="john.doe@example.com" required>
                </div>
                <div class="form-row">
                    <label for="message">What happened?</label>
                    <textarea id="message" v-model="message" cols="auto" rows="7" placeholder="Something went wrong" required/>
                </div>
                <div class="form-row">
                    <input class="btn btn-secondary" type="submit" value="Send">
                </div>
            </form>

            <div class="deliver-status-container" v-if="emailIsDelivered">
                <div class="deliver-successful" v-if="deliverIsSuccessful">
                    <p>Thank you. Your message was delivered. We will contact you shortly.</p>
                </div>
                <div class="deliver-is-failed" v-if="!deliverIsSuccessful">
                    <p>Your message wasn't delivered. Something went wrong. Try again, please.</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ApiService from "../services/api.service";

    export default {
        name: "Support",
        data() {
            return {
                name: '',
                email: '',
                message: '',
                deliverIsSuccessful: false,
                emailIsDelivered: false,
            }
        },
        methods: {
            sendEmail() {
                ApiService.sendEmail(this.name, this.email, this.message)
                    .then(response => {
                        console.log(response);
                        if (response && response.status === 200) {
                            this.name = '';
                            this.email = '';
                            this.message = '';
                            this.emailIsDelivered = true;
                            this.deliverIsSuccessful = true;
                            setTimeout(() => {
                                this.emailIsDelivered = false;
                                this.deliverIsSuccessful = false;
                            }, 7000)
                        }
                        else {
                            this.emailIsDelivered = true;
                            this.deliverIsSuccessful = false;
                            setTimeout(() => {
                                this.emailIsDelivered = false;
                                this.deliverIsSuccessful = false;
                            }, 7000)
                        }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    h2 {
        font-size: $block-header-size;
    }

    .container {
        width: 100%;
        height: auto;
        margin-top: 40px;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
        height: 30px;
        text-align: center;
    }

    .form-container {
        max-width: 350px;
        width: auto;
        height: auto;
        margin: 20px;
    }


    .form-row {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        margin: 0 0 20px;
        font-size: $default-text-size;

        &>input {
            width: 100%;
        }

        & > textarea {
            padding: 5px;
            border: 1px solid $light-gray;
            border-radius: 5px;
            width: 100%;
            resize: none;
            background-color: inherit;
        }
    }

    .form-input {
        padding: 5px;
        border: none;
        border-bottom: 1px solid $light-gray;
        background-color: inherit;
    }

    .deliver-status-container {
        width: 100%;
        margin-top: 20px;
    }

    .deliver-successful, .deliver-is-failed {
        font-size: $default-text-size;
        text-align: center;
        line-height: 1.5;
        font-weight: 600;
    }

    .deliver-successful {
        color: #46ad51;
    }

    .deliver-is-failed {
        color: #bd2330;
    }


    @media screen and (min-width: 768px){
        .container {
            width: 70%;
            margin-top: 40px;
        }

        .form-container {
            max-width: 500px;
            width: auto;
            height: auto;
            background-color: #ffffff;
            box-shadow: 0 6px 12px rgba(0,0,0,.175);
            padding: 20px;
            margin: 20px auto;
            border-radius: 5px;
        }

    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 40px auto 0;
        }
    }
</style>
