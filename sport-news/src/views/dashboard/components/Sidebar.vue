<template>
<div class="md:flex flex-col md:flex-row md:min-h-[90vh] relative">
    <div v-click-away="onClickAway" class="flex flex-col w-full md:w-64 text-gray-200 bg-gray-900 flex-shrink-0">
        <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <router-link :to="{name: 'home'}" class="font-bold text-xl">LOGO</router-link>
            <button class="rounded-lg md:hidden lg focus:outline-none focus:shadow-outline" @click="open2 = !open2">
                <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                    <path v-if="!open2" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path v-if="open2" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <nav :class="{'block': open2, 'hidden': !open2}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <router-link :to="{name: 'dashboard'}" class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline">Dashboard</router-link>
            <div v-click-away="onClickAway" class="relative" x-data="{ open: false }">
                <button @click="open = !open" class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left rounded-lg bg-transparent focus:text-white hover:text-white hover:bg-gray-600 md:block focus:outline-none focus:shadow-outline">
                    <span>Management</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': open, 'rotate-0': !open}" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div v-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg" style="z-index: 1;">
                    <div class="px-2 py-2 rounded-md shadow bg-gray-800 z-10">
                        <router-link :to="{name: 'categories-list'}" class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline" >Categories</router-link>
                        <router-link :to="{name: 'posts-list'}" class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline" >Posts</router-link>
                    </div>
                </div>
            </div>
            <div v-click-away="onClickAwayy" class="relative" x-data="{ open: false }">
                <button @click="open1 = !open1" class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left rounded-lg bg-transparent focus:text-white hover:text-white hover:bg-gray-600 md:block focus:outline-none focus:shadow-outline">
                    <span>Users</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': open1, 'rotate-0': !open1}" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div v-show="open1" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg" style="z-index: 1;">
                    <div class="px-2 py-2 rounded-md shadow bg-gray-800 z-10">
                        <a class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline" >All Users</a>
                        <a class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline" >Normal Users</a>
                        <a class="block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white text-gray-200 focus:outline-none focus:shadow-outline" >Admins</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</div>
</template>

<script>
import { directive } from "vue3-click-away";

export default{
    name: 'Sidebar',
    directives: {
        ClickAway: directive
    },
    data(){
        return{
            open: false,
            open1: false,
            open2: false,
        }
    },
    methods: {
        onClickAway(event){
            this.open = false               
        },
        onClickAwayy(event){
            this.open1 = false
        }
    },
}
</script>