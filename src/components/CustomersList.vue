<template>
  <div class="container">
    <h2 class="page-logo">
      Customers directory
    </h2>
    <div
      v-if="customers.length > 0"
      class="customers-list"
    >
      <div
        v-for="customer in customers"
        class="customer"
      >
        <router-link :to="{ name: 'customer', params: { id: customer.Id} }">
          <div class="user-info">
            <h4 class="customer-name">
              {{ `${customer.Name}` }}
            </h4>
            <button
              class="btn btn-link"
              style="padding: 0"
              @click.prevent="redirectToWebsite(customer.Website)"
            >
              {{ `${customer.Website}` }}
            </button>
            <p class="customer-desc">
              {{ customer.Description }}
            </p>
          </div>
          <img
            class="right-arrow-icon"
            src="../assets/right-arrow-icon.svg"
            alt=">"
          >
        </router-link>
      </div>
    </div>
    <div
      v-if="pageCount !== 0"
      class="pagination-container"
    >
      <paginate
        :page-count="pageCount"
        :click-handler="selectPageHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
      />
    </div>
  </div>
</template>

<script>
    import SearchService from "../services/search.service";
    import ApiService from "../services/api.service";
    import PaginateService from "../services/paginate.service";

    export default {
        name: "CustomersList",
        data() {
            return {
                customers: [],
                pageCount: 0
            }
        },
        mounted() {
            this.getPageCount();
            this.selectPageHandler(1);
        },
        beforeDestroy() {
            SearchService.clearSearchList();
        },
        methods: {
            getPageCount() {
                ApiService.getAllCustomersCount().then(d => {
                    this.pageCount = Math.floor(d / PaginateService.getPageSize());
                });
            },

            selectPageHandler(pageNumber) {

              ApiService.getCustomersWithPagination(PaginateService.getPageSize(), PaginateService.getOffset(pageNumber))
                      .then(customers => {
                        this.customers = customers;
                        this.setSearch();
                      });
            },

            setSearch() {
                SearchService.clearSearchList();
                SearchService.setSearchList(this.customers.map(c => {
                    return {
                        id: c.Id,
                        search_item: `${c.Name}`
                    }
                }), 'customer');
            },

          redirectToWebsite(url) {
            let regExp=/^https?:\/\/[\w\/?.&-=]+$/;
            window.open(regExp.test(url) ? url : '//' + url, '_blank');
            },
        }
    }
</script>

<style scoped lang="scss">
    h2 {
        font-size: $block-header-size;
    }

    h4 {
        font-size: $list-header-size;
    }

    .container {
        width: 100%;
        height: auto;
        margin-top: 40px;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
        height: 30px;
        margin-left: 10px;
    }

    .customers-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    .customer {
        border-bottom: 1px solid $light-gray;

        &>a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                background-color: $hover-white;
            }
        }
    }

    .user-info {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .customer-name {
        margin: 20px 0 5px 0;
        color: $dark-blue;
    }

    .customer-desc{
      color: $dark-blue;
    }

    .right-arrow-icon {
        width: 25px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;

        &:hover {
            background-color: $light-gray;
        }
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
