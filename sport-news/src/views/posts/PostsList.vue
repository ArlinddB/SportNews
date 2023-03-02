<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      search: '',
      page: 1,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20],
      count: 0,
      total: 0,
    };
  },
  computed: {
    ...mapGetters({
      paginatedPosts: 'post/paginatedPosts',
      allPosts: 'post/allPosts',
      isLoading: 'post/isLoading',
    }),
    filteredList() {
      if(this.search){
        return this.allPosts.filter((c) =>
          c?.title?.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return this.paginatedPosts
    },
  },
  methods: {
    handleDeletePost(postId) {
      this.$store.dispatch("post/deletePost", postId);
    },
    clickCallback() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize,
      );
      this.$store.dispatch("post/fetchPosts", params);

      axios.get(`http://localhost:4000/posts?limit=0`).then((res) => {
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
        <div class="pt-2 pb-6 flex justify-between">
          <router-link
            class="
              inline-block
              px-4
              py-2.5
              text-white
              font-medium
              text-sm
              leading-tight
              rounded
              shadow-md
              bg-blue-600
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-700 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
            to="/posts/create"
            >Add new Post
          </router-link>
          <div
            v-if="paginatedPosts"
            class="
              w-auto
              flex
              justify-end
              px-2
              items-center
              focus:ring-0
              transition
              duration-300
              border-b-2 border-b-[#006db0]
            "
          >
            <input
              type="search"
              v-model="search"
              placeholder="Search..."
              class="
                bg-transparent
                text-zinc-700
                dark:text-zinc-300
                border-none
                outline-none
              "
            />
          </div>
        </div>
        <div
          class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="
                    px-5
                    py-3
                    border-b-2 border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-left text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Title
                </th>
                <th
                  class="
                    px-5
                    py-3
                    border-b-2 border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-left text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Content
                </th>
                <th
                  class="
                    px-5
                    py-3
                    border-b-2 border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-left text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Image
                </th>
                <th
                  class="
                    px-5
                    py-3
                    border-b-2 border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-left text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Category
                </th>
                <th
                  class="
                    px-5
                    py-3
                    border-b-2 border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-left text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    uppercase
                    tracking-wider
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in this.filteredList" :key="post._id">
                <td
                  style="width: 250px;"
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-zinc-700
                    dark:text-zinc-300
                    text-sm
                    break-all
                  "
                >
                  {{ post.title }}
                </td>
                <td
                  style="width: 250px;"
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-zinc-700
                    dark:text-zinc-300
                    text-sm
                    break-all
                  "
                >
                  {{ post.content }}
                </td>
                <td
                  style="width: 250px;"
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-zinc-700
                    dark:text-zinc-300
                    text-sm
                    break-all
                  "
                >
                  {{ post.img }}
                </td>
                <td
                  style="width: 250px;"
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-zinc-700
                    dark:text-zinc-300
                    text-sm
                    break-all
                  "
                >
                  {{ post.category }}
                </td>
                <td
                  class="
                    px-5
                    py-5
                    border-t border-zinc-400
                    bg-gray-50
                    dark:bg-gray-900
                    text-sm
                  "
                >
                  <router-link
                    class="
                      inline-block
                      px-4
                      py-2.5
                      bg-blue-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      rounded
                      shadow-md
                      hover:bg-blue-700 hover:shadow-lg
                      focus:bg-blue-700
                      focus:shadow-lg
                      focus:outline-none
                      focus:ring-0
                      active:bg-blue-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out
                      m-1
                    "
                    :to="`/posts/edit/${post._id}`"
                    ><i class="fa-solid fa-pen mr-2"></i>Edit</router-link
                  >
                  <a
                    class="
                      inline-block
                      px-4
                      py-2.5
                      bg-red-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      rounded
                      shadow-md
                      hover:bg-red-700 hover:shadow-lg
                      focus:bg-red-700
                      focus:shadow-lg
                      focus:outline-none
                      focus:ring-0
                      active:bg-red-800 active:shadow-lg
                      my-1
                      transition
                      duration-150
                      ease-in-out
                      m-1
                      cursor-pointer
                    "
                    @click="handleDeletePost(post._id)"
                    ><i class="fa-solid fa-trash mr-2"></i>Delete</a
                  >
                  <router-link
                    class="
                      inline-block
                      px-4
                      py-[8px]
                      border-2 border-blue-700
                      text-zinc-700
                      dark:text-white
                      font-medium
                      text-xs
                      leading-tight
                      rounded
                      hover:bg-blue-700 hover:text-white
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                      m-1
                    "
                    :to="`/posts/details/${post._id}`"
                    ><i class="fa-solid fa-eye mr-2"></i>Details</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>      
      <div v-if="!search && paginatedPosts.length" class="my-10 flex">
        <div class="mb-3 flex flex-col text-zinc-800 dark:text-zinc-300">
          Items per Page:
          <select v-model="pageSize" @change="handlePageSizeChange($event)" class="bg-transparent border-b outline-none">
            <option v-for="size in pageSizes" :key="size" :value="size" class="dark:text-zinc-800">
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