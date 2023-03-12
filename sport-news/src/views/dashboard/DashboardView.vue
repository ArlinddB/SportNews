<template>
  <div class="md:flex">
    <Sidebar />
    <div
      class="antialiased w-full min-h-screen text-slate-300 relative py-4 grid items-center"
    >
      <div
        class="grid grid-cols-9 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-4xl my-2 p-4"
      >
        <div id="content" class="bg-gray-900 col-span-9 rounded-lg p-6">
          <div id="24h">
            <h1 class="font-bold py-4 uppercase">Statistics</h1>
            <div id="stats" class="grid gird-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-black/60 to-white/5 p-6 rounded-lg">
                <div class="flex flex-row space-x-4 items-center">
                  <div id="stats-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-10 h-10 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-indigo-300 text-sm font-medium uppercase leading-4"
                    >
                      Total Users
                    </p>
                    <p
                      class="text-white font-bold text-2xl inline-flex items-center space-x-2"
                    >
                      <span>{{ count.users }}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-black/60 to-white/5 p-6 rounded-lg">
                <div class="flex flex-row space-x-4 items-center">
                  <div id="stats-1">
                    <svg
                      fill="none"
                      viewBox="0 0 48 48"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-10 h-10 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="invisible_box" data-name="invisible box"></g>
                        <g id="icons_Q2" data-name="icons Q2">
                          <path
                            d="M24,10h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,10Z"
                          />
                          <path
                            d="M24,24h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,24Z"
                          />
                          <path
                            d="M24,38h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,38Z"
                          />
                          <path
                            d="M12,7.9,14.4,12H9.5L12,7.9M12,2a2.1,2.1,0,0,0-1.7,1L4.2,13a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H18a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-6-10A1.9,1.9,0,0,0,12,2Z"
                          />
                          <path
                            d="M12,30a6,6,0,1,1,6-6A6,6,0,0,1,12,30Zm0-8a2,2,0,1,0,2,2A2,2,0,0,0,12,22Z"
                          />
                          <path
                            d="M16,44H8a2,2,0,0,1-2-2V34a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8A2,2,0,0,1,16,44Zm-6-4h4V36H10Z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-indigo-300 text-sm font-medium uppercase leading-4"
                    >
                      Total Categories
                    </p>
                    <p
                      class="text-white font-bold text-2xl inline-flex items-center space-x-2"
                    >
                      <span>{{ count.categories }}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-black/60 p-6 rounded-lg">
                <div class="flex flex-row space-x-4 items-center">
                  <div id="stats-1">
                    <svg
                      fill="none"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-teal-300 text-sm font-medium uppercase leading-4"
                    >
                      Total Posts
                    </p>
                    <p
                      class="text-white font-bold text-2xl inline-flex items-center space-x-2"
                    >
                      <span>{{ count.posts }}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="last-incomes">
            <h1 class="font-bold py-4 uppercase">Most Viewed Posts</h1>
            <div
              id="stats"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div
                v-for="(post, idx) in topPosts"
                :key="idx"
                class="bg-black/60 to-white/5 rounded-lg"
              >
                <div class="p-2 text-center">
                  <p
                    class="text-lg font-bold"
                    style="
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                    "
                  >
                    {{ post.title }}
                  </p>
                  <p class="text-gray-500 font-medium">{{ post.category }}</p>
                  <p class="text-gray-500 text-sm">
                    Posted at: {{ post.created_at }}
                  </p>
                </div>
                <div class="border-t border-white/5 p-4 text-center">
                  <router-link
                    :to="{ name: 'posts-page', params: { id: post._id } }"
                    class="inline-flex space-x-2 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    <span>Info</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- <div id="last-users">
            <h1 class="font-bold py-4 uppercase">Last 24h users</h1>
            <div class="overflow-x-scroll">
              <table class="w-full whitespace-nowrap">
                <thead class="bg-black/60">
                  <th class="text-left py-3 px-2 rounded-l-lg">Name</th>
                  <th class="text-left py-3 px-2">Username</th>
                  <th class="text-left py-3 px-2">Birthdate</th>
                  <th class="text-left py-3 px-2">Email</th>
                  <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
                </thead>
               
                <tr class="border-b border-gray-700">
                  <td class="py-3 px-2 font-bold">FullName</td>
                  <td class="py-3 px-2">UserName</td>
                  <td class="py-3 px-2">
                    Birthdate
                  </td>
                  <td class="py-3 px-2">Email</td>
                  <td class="py-3 px-2">
                    <div class="inline-flex items-center space-x-3">
                      <a
                        href="#"
                      >
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
                      </a>
                      <a
                        href="#"
                        class="hover:text-white"
                      >
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
                      </a>
                      <a
                        href="#"
                        class="hover:text-white"
                      >
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
                      </a>
                    </div>
                  </td>
                </tr>
                }
              </table>
            </div>
            <a
              href="#"
              class="inline-block px-4 py-2 my-3 bg-teal-600 hover:bg-teal-700 rounded shadow transition"
              >View More</a
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters({
      count: "dashboard/count",
      topPosts: "post/mostClicked",
    }),
  },
  mounted() {
    this.$store.dispatch("dashboard/index");
    this.$store.dispatch("post/mostClicked");
  },
};
</script>