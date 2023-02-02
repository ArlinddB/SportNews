<template>
  <footer class="w-full bg-gray-200 dark:bg-gray-900 py-1">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <div class="flex justify-center flex-wrap w-full md:w-4/12 px-4">
          <div class="text-sm text-gray-600 font-semibold py-1">
            Copyright © {{ date }}
            <a
              href="#"
              class="text-gray-600 hover:text-gray-400 text-sm font-semibold py-1"
              >Team</a
            >
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="#"
                class="
                  text-gray-600
                  hover:text-gray-400
                  text-sm
                  font-semibold
                  block
                  py-1
                  px-3
                "
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  text-gray-600
                  hover:text-gray-400
                  text-sm
                  font-semibold
                  block
                  py-1
                  px-3
                "
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  text-gray-600
                  hover:text-gray-400
                  text-sm
                  font-semibold
                  block
                  py-1
                  px-3
                "
                >MIT License</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>