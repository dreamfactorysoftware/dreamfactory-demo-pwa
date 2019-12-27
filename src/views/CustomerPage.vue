<template>
  <div class="container">
    <div class="top-link">
      <router-link :to="goToCustomersRoute">
        <img
          src="../assets/right-arrow-icon.svg"
          class="right-arrow-icon"
          alt="back"
        >Go to customers directory
      </router-link>
    </div>
    <div
      v-if="customer.Id"
      class="customer-information"
    >
      <h2>{{ `${customer.Name}` }}</h2>

      <p v-if="customer.Industry">
        <b>Industry:</b>
        {{ customer.Industry }}
      </p>
      <p v-if="customer.NumberOfEmployees">
        <b>Number of employees:</b>
        {{ customer.NumberOfEmployees }}
      </p>
      <p v-if="customer.UpsellOpportunity__c">
        <b>Upsell opportunity:</b>
        {{ customer.UpsellOpportunity__c }}
      </p>
      <p v-if="customer.CreatedDate">
        <b>Created date:</b>
        {{ customer.CreatedDate }}
      </p>
      <p v-if="customer.CustomerPriority__c">
        <b>Priority:</b>
        {{ customer.CustomerPriority__c }}
      </p>

      <h4 v-if="customer.Website && customer.Phone && customer.Fax">
        Contacts:
      </h4>
      <p v-if="customer.Website">
        <b>Website</b> <a
          :href="getWebsiteLink(customer.Website)"
          target="_blank"
        >{{ customer.Website }}</a>
      </p>
      <p v-if="customer.Phone">
        <b>Phone</b> <a :href="'tel:' + customer.Phone"> {{ customer.Phone }}</a>
      </p>
      <p v-if="customer.Fax">
        <b>Fax</b> <a :href="'fax:' + customer.Fax"> {{ customer.Fax }}</a>
      </p>

      <div
        v-if="customer.BillingStreet"
        class="address-block"
      >
        <h4>Address:</h4>
        <p v-if="customer.BillingCountry">
          <b>Country:</b> {{ customer.BillingCountry }}
        </p>
        <p v-if="customer.BillingCity">
          <b>City:</b> {{ customer.BillingCity }}
        </p>
        <p v-if="customer.BillingStreet">
          <b>Billing street:</b> {{ customer.BillingStreet }}
        </p>
        <p v-if="customer.BillingPostalCode">
          <b>Postcode:</b> {{ customer.BillingPostalCode }}
        </p>
        <p v-if="customer.BillingState">
          <b>State:</b> {{ customer.BillingState }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import ApiService from "../services/api.service";

    export default {
        name: "CustomerDetailsPage",
        data() {
            return {
                customer: {},
                goToCustomersRoute: { name: 'customers'}
            }
        },
        mounted() {
            this.getCustomerById(this.$router.currentRoute.params.id);

        },
        methods: {
            async getCustomerById(id) {
                this.customer = await ApiService.getCustomerById(id);
            },

            getWebsiteLink(url) {
                let regExp=/^https?:\/\/[\w\/?.&-=]+$/;
                return regExp.test(url) ? url : '//' + url;
            }
        }
    }
</script>

<style scoped lang="scss">

    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 40px 0;
    }

    .top-link {
        margin-bottom: 30px;

        &>a {
            color: $dark-blue !important;
            font-size: $default-text-size;
            display: flex;
            align-items: center;

            &:hover {
                text-decoration: none;
            }
        }
    }

    .right-arrow-icon {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;
        transform: rotate(180deg);

        &:hover {
            background-color: $light-gray;
        }
    }

    .customer-information {

        &>h2 {
            margin-bottom: 20px;
        }

        h4 {
            margin-top: 40px;
            margin-bottom: 15px;
        }

        &>p {
            font-size: $default-text-size;
            line-height: 1.5;
        }
    }

    .address-block {

        &>p {
            font-size: $default-text-size;
            line-height: 1.5;
        }
    }

    .map-link {
        font-size: $default-text-size;
        padding: 0;
        vertical-align: inherit;
    }

    @media screen and (min-width: 768px){
        .container {
            width: 70%;
            margin: 40px auto 0;
        }
    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 40px auto 0;
        }
    }

</style>
