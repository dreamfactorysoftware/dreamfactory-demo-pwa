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
      <div class="info-block">
        <h4 class="customer-name">
          <md-icon>account_box</md-icon>
          {{ `${customer.Name}` }}
        </h4>

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
      </div>

      <div class="info-block">
        <h4 v-if="customer.Website && customer.Phone && customer.Fax"
            class="customer-contacts">
          <md-icon>contacts</md-icon>
          Contacts:
        </h4>
        <p v-if="customer.Website">
          <b>Website</b>
          <a
            :href="getWebsiteLink(customer.Website)"
            target="_blank"
          >
            {{ customer.Website }}
          </a>
        </p>
        <p v-if="customer.Phone">
          <b>Phone</b> <a :href="'tel:' + customer.Phone"> {{ customer.Phone }}</a>
        </p>
        <p v-if="customer.Fax">
          <b>Fax</b> <a :href="'fax:' + customer.Fax"> {{ customer.Fax }}</a>
        </p>
      </div>

      <div
        v-if="customer.BillingStreet"
        class="info-block"
      >
        <h4 class="customer-address">
          <md-icon>business</md-icon>
          Address:
        </h4>
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
            this.getCustomerById(this.$router.currentRoute.params.eid);

        },
        methods: {
            getCustomerById(id) {
                ApiService.getCustomerById(id).then(customer => {
                    this.customer = customer;
                    this.$store.commit('setHeader', customer.Name);
                });
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

      margin: 10px 0 20px 0;

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

      & > h4 {
        margin-top: 40px;
        margin-bottom: 15px;
        font-size: $block-header-size;
        font-weight: 700;
      }

      & > h4:first-of-type {
        margin-top: 0;
      }
    }

    .info-block {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      & > h4 {
        font-family: Raleway, sans-serif;
        margin-top: 40px;
        margin-bottom: 15px;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .customer-name {
        margin-top: 0;
      }

      &>p {
        font-size: $default-text-size;
        line-height: 1.5;
      }
    }

    .customer-name, .customer-contacts, .customer-address {
      display: flex;
      align-items: center;
      width: 100%;

      & > i {
        margin: 0 8px 0 0;
        color: $light-blue!important;
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
