<template>
    <div class="antialiased w-full min-h-screen text-slate-300 relative py-4">
      <div class="mx-auto gap-2 sm:gap-2 md:gap-4 lg:gap-6 max-w-6xl my-2 px-2">
        <div class="pt-2 pb-6 flex justify-between">
          <router-link :to="{name: 'posts-create-dashboard'}"
            class="inline-block text-white px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded shadow transition"
            >Add new Post</router-link
          >
          <div
            v-if="paginatedPosts"
            class="w-auto flex justify-end px-2 items-center focus:ring-0 transition duration-300 border-b-2 border-b-[#006db0]"
          >
            <input
              type="search"
              v-model="search"
              placeholder="Search..."
              class="bg-transparent text-zinc-700 dark:text-zinc-300 border-none outline-none"
            />
          </div>
        </div>
        <div id="content" class="bg-[#17191f] col-span-9 rounded-lg p-6">
          <div id="last-users">
            <h1 class="font-bold py-4 uppercase">Posts</h1>
            <div class="overflow-x-scroll">
              <table class="w-full whitespace-nowrap">
                <thead class="bg-black/60">
                  <th class="text-left py-3 px-2 rounded-l-lg">Title</th>
                  <th class="text-left py-3 px-2">Content</th>
                  <th class="text-left py-3 px-2">Image</th>
                  <th class="text-left py-3 px-2">Category</th>
                  <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
                </thead>
  
                <tr
                  class="border-b border-gray-700"
                  v-for="post in this.filteredList"
                  :key="post._id"
                >
                  <td class="py-3 px-2 font-bold">
                    {{ post.title }}
                  </td>
                  <td class="py-3 px-2 font-bold">
                    {{ post.content }}
                  </td>
                  <td class="py-3 px-2 font-bold w-44">
                    {{ post.img }}
                  </td>
                  <td class="py-3 px-2 font-bold w-44">
                    {{ post.category }}
                  </td>
                  <td>
                    <div class="inline-flex items-center space-x-3">
                      <router-link :to="{name: 'posts-edit-dashboard', params: {id: post._id}}" title="Edit" class="hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </router-link>
                      <router-link :to="{name: 'posts-details-dashboard', params: {id: post._id}}" title="Details" class="hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </router-link>
                      <button title="Delete" @click="handleDeletePostx(post._id)" class="hover:text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="!search && paginatedPosts.length" class="my-10 flex">
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
        paginatedPosts: "post/paginatedPosts",
        allPosts: "post/allPosts",
        isLoading: "post/isLoading",
      }),
      filteredList() {
        if (this.search) {
          return this.allPosts.filter((c) =>
            c?.title?.toLowerCase().includes(this.search.toLowerCase())
          );
        }
        return this.paginatedPosts;
      },
    },
    methods: {
      handleDeletePost(postId) {
        this.$store.dispatch("post/deletePost", postId);
      },
      clickCallback() {
        const params = this.getRequestParams(this.page, this.pageSize);
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