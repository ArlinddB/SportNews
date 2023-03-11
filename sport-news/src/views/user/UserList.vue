<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      page: 1,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20],
      count: 0,
      total: 0,
    };
  },
  computed: {
    ...mapGetters({
      paginatedUsers: "user/paginatedUsers",
      allUsers: "user/allUsers",
      isLoading: "user/isLoading",
    }),
    filteredList() {
      if (this.search) {
        return this.allUsers.filter((c) =>
          c?.title?.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return this.paginatedUsers;
    },
  },
  methods: {
    handleDeleteUser(userId) {
      this.$store.dispatch("user/deleteUser", userId);
    },
    clickCallback() {
      const params = this.getRequestParams(this.page, this.pageSize);
      this.$store.dispatch("user/fetchUsers", params);

      axios.get(`http://localhost:4000/users?limit=0`).then((res) => {
        const { list } = res.data;

        this.count = list.length;

        this.total = Math.ceil(this.count / this.pageSize);
      });

      sessionStorage.setItem("page", this.page);
      sessionStorage.setItem("pageSize", this.pageSize);
    },
    getRequestParams(page, pageSize) {
      let params = {};

      if (page) {
        params["page"] = page;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.clickCallback();
    },
  },
  mounted() {
    const storedPage = sessionStorage.getItem("page");
    const storedPageSize = sessionStorage.getItem("pageSize");

    if (storedPage) {
      this.page = parseInt(storedPage);
    }

    if (storedPageSize) {
      this.pageSize = parseInt(storedPageSize);
    }

    this.clickCallback();
  },
};
</script>




<template>
  <div class="min-h-[79vh] flex flex-col justify-center items-center">
    <div v-if="isLoading">
      <span class="loader"></span>
    </div>
    <div v-if="!isLoading" class="container max-w-full mx-auto px-4 sm:px-8">
      <div class="py-8 -mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div
          class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
          <table class="min-w-full leading-normal bg-gray-50 dark:bg-gray-900">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-zinc-400 bg-gray-50 dark:bg-gray-900 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-zinc-400 bg-gray-50 dark:bg-gray-900 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                >
                  Email
                </th>

                <th
                  class="px-5 py-3 border-b-2 border-zinc-400 bg-gray-50 dark:bg-gray-900 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-t-2 border-zinc-400"
                v-for="post in this.filteredList"
                :key="post._id"
              >
                <td
                  style="width: 250px"
                  class="px-5 py-5 bg-gray-50 dark:bg-gray-900 text-zinc-700 dark:text-zinc-300 text-sm break-all"
                >
                  {{ user.Name }}
                </td>
                <td
                  class="px-5 py-5 bg-gray-50 dark:bg-gray-900 text-zinc-700 dark:text-zinc-300 text-sm pb-1 break-all"
                  style="
                    width: 250px; display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                >
                  {{ user.Email }}
                </td>
               
                <td class="px-5 py-5 bg-gray-50 dark:bg-gray-900 text-sm">
                  <router-link
                    class="inline-block px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out m-1"
                    :to="{name: 'users-edit', params: {id: `${user._id}`}}"
                    ><i class="fa-solid fa-pen mr-2"></i>Edit</router-link
                  >
                  <a
                    class="inline-block px-4 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg my-1 transition duration-150 ease-in-out m-1 cursor-pointer"
                    @click="handleDeleteUser(user._id)"
                    ><i class="fa-solid fa-trash mr-2"></i>Delete</a
                  >

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="!search && paginatedUsers.length" class="my-10 flex">
        <div class="mb-3 flex flex-col text-zinc-800 dark:text-zinc-300">
          Items per Page:
          <select
            v-model="pageSize"
            @change="handlePageSizeChange($event)"
            class="bg-transparent border-b outline-none"
          >
            <option
              v-for="size in pageSizes"
              :key="size"
              :value="size"
              class="dark:text-zinc-800"
            >
              {{ size }}
            </option>
          </select>
        </div>
        <vue-awesome-paginate
          :total-items="total"
          v-model="page"
          :items-per-page="1"
          :max-pages-shown="3"
          :on-click="clickCallback"
          :show-breakpoint-buttons="true"
          :disable-breakpoint-buttons="false"
          paginationContainerClass="flex mx-auto gap-3"
          paginateButtonsClass="w-[40px] h-[40px] p-[5px] rounded-full cursor-pointer bg-gray-200 dark:bg-gray-300 text-zinc-800 hover:bg-gray-300 hover:dark:bg-gray-400"
          activePageClass="bg-blue-600 text-zinc-200 dark:bg-blue-600 dark:text-zinc-300"
        />
      </div>
    </div>
  </div>
</template>