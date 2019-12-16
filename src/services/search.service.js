
const SearchService = {
    searchList: [],
    searchResult: [],
    redirectRouteName: '',

    setSearchList(list, routeName) {
        this.searchList.length = 0;
        this.searchList = list;
        this.redirectRouteName = routeName;
    },

    searchHandler(query) {
        return {
            list: this.searchList.filter(i => i.search_item.search(new RegExp(query, 'i')) === 0 ),
            routeName: this.redirectRouteName
        };
    },

    clearSearchList() {
        this.searchList.length = 0;
    }
};

export default SearchService;
