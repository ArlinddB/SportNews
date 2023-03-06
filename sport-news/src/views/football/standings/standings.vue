<template>
  <div class="min-h-[79vh] p-6">
    <div
      v-if="isLoading"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <span class="loader"></span>
    </div>
    <div
      v-if="!isLoading"
      class="flex flex-col md:flex-row justify-center gap-x-8 gap-y-4"
    >
      <aside
        class="w-full lg:w-auto pt-4 pl-4 lg:p-4 text-zinc-700 dark:text-zinc-300"
      >
        <h2 class="font-bold text-xl mb-4">Football Leagues</h2>
        <ul
          class="flex flex-col gap-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-lg"
        >
          <li
            v-for="(league, idx) in leagues"
            :key="idx"
            @click="handleStanding(league.id, league.name)"
            class="cursor-pointer border-b border-zinc-400 mb-1 hover:border-blue-600 transition-all"
            :class="{
              'border-b-2 border-blue-600': selectedLeague === league.id,
            }"
          >
            {{ league.name }}
          </li>
        </ul>
      </aside>
      <div class="overflow-x-scroll sm:overflow-x-visible">
        <div class="w-full p-4">
          <h2 class="text-xl font-bold mb-6 text-zinc-700 dark:text-zinc-300">
            {{ leagueName }} Table
          </h2>
          <table
            class="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg w-full text-zinc-700 dark:text-zinc-300 text-sm"
          >
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">#</th>
                <th class="px-4 py-2 text-left">Team</th>
                <th class="px-4 py-2 text-left">Played</th>
                <th class="px-4 py-2 text-left">Won</th>
                <th class="px-4 py-2 text-left">Drawn</th>
                <th class="px-4 py-2 text-left">Lost</th>
                <th class="px-4 py-2 text-left hidden lg:inline-block">GF</th>
                <th class="px-4 py-2 text-left hidden lg:inline-block">GA</th>
                <th class="px-4 py-2 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stand, idx) in standings"
                :key="idx"
                class="border-t-2 border-zinc-400"
              >
                <td class="px-4 py-2">{{ stand.overall_league_position }}.</td>
                <td class="px-4 py-2 flex truncate">
                  <img class="w-6 mr-3" :src="stand.team_badge" />
                  {{ stand.team_name }}
                </td>
                <td class="px-4 py-2">{{ stand.overall_league_payed }}</td>
                <td class="px-4 py-2">{{ stand.overall_league_W }}</td>
                <td class="px-4 py-2">{{ stand.overall_league_D }}</td>
                <td class="px-4 py-2">{{ stand.overall_league_L }}</td>
                <td class="px-4 py-2 hidden lg:inline-block">
                  {{ stand.overall_league_GF }}
                </td>
                <td class="px-4 py-2 hidden lg:inline-block">
                  {{ stand.overall_league_GA }}
                </td>
                <td class="px-4 py-2">{{ stand.overall_league_PTS }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedLeague: 152,
      leagueName: "Premier League",
      leagues: [
        { id: 152, name: "Premier League" },
        { id: 302, name: "La Liga" },
        { id: 207, name: "Serie A" },
        { id: 175, name: "Bundesliga" },
        { id: 168, name: "Ligue 1" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      standings: "standings/standingsByLeague",
      isLoading: "standings/isLoading",
    }),
  },
  methods: {
    handleStanding(id, name) {
      this.$store.dispatch("standings/getStandingsByLeague", id);
      this.selectedLeague = id;
      this.leagueName = name;
    },
  },
  mounted() {
    this.$store.dispatch("standings/getStandingsByLeague", this.selectedLeague);
  },
};
</script>
