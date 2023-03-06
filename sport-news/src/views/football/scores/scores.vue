<!-- <template>
  <div class="flex justify-center">
    <aside class="w-1/4 px-4">
      <ul class="mb-4">
        <li v-for="(league, index) in leagues" :key="index" class="mb-2">
          <a :href="'#' + league.name">{{ league.name }}</a>
        </li>
      </ul>
    </aside>
    <div class="w-3/4 px-4">
      <table class="w-full border">
        <thead>
          <tr>
            <th class="text-left p-2 bg-gray-200">Pos</th>
            <th class="text-left p-2 bg-gray-200">Team</th>
            <th class="text-center p-2 bg-gray-200">Pl</th>
            <th class="text-center p-2 bg-gray-200">W</th>
            <th class="text-center p-2 bg-gray-200">D</th>
            <th class="text-center p-2 bg-gray-200">L</th>
            <th class="text-center p-2 bg-gray-200">GD</th>
            <th class="text-center p-2 bg-gray-200">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index" :id="team.league">
            <td class="p-2">{{ team.position }}</td>
            <td class="p-2">{{ team.name }}</td>
            <td class="p-2 text-center">{{ team.played }}</td>
            <td class="p-2 text-center">{{ team.won }}</td>
            <td class="p-2 text-center">{{ team.drawn }}</td>
            <td class="p-2 text-center">{{ team.lost }}</td>
            <td class="p-2 text-center">{{ team.goalDifference }}</td>
            <td class="p-2 text-center">{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      leagues: [
        { name: "Premier League" },
        { name: "La Liga" },
        { name: "Serie A" },
        { name: "Bundesliga" },
        { name: "Ligue 1" },
        { name: "Champions League" },
      ],
      teams: [
        {
          position: 1,
          name: "Manchester City",
          played: 26,
          won: 20,
          drawn: 5,
          lost: 1,
          goalDifference: 36,
          points: 65,
          league: "Premier League",
        },
        {
          position: 2,
          name: "Manchester United",
          played: 26,
          won: 15,
          drawn: 8,
          lost: 3,
          goalDifference: 21,
          points: 53,
          league: "Premier League",
        },
        {
          position: 3,
          name: "Leicester City",
          played: 27,
          won: 15,
          drawn: 4,
          lost: 8,
          goalDifference: 15,
          points: 49,
          league: "Premier League",
        },
        // more teams...
      ],
    };
  },
};
</script>   -->

<template>
  <div class="flex flex-col lg:flex-row">
    <aside class="w-full lg:w-1/4 p-4">
      <ul class="flex flex-col gap-2">
        <li class="font-bold text-lg">Football Leagues</li>
        <li v-for="(league, idx) in leagues" :key="idx">
            {{ league.name }}
        </li>
      </ul>
    </aside>
    <div class="w-full lg:w-3/4 p-4">
      <h2 class="text-xl font-bold mb-4">Premier League Table</h2>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2">Team</th>
            <th class="px-4 py-2">Played</th>
            <th class="px-4 py-2">Won</th>
            <th class="px-4 py-2">Drawn</th>
            <th class="px-4 py-2">Lost</th>
            <th class="px-4 py-2">GF</th>
            <th class="px-4 py-2">GA</th>
            <th class="px-4 py-2">GD</th>
            <th class="px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stand, idx) in standings" :key="idx">
            <td class="border px-4 py-2">{{ stand.team_name }}</td>
          </tr>
          <!-- <tr>
            <td class="border px-4 py-2">2</td>
            <td class="border px-4 py-2">Manchester United</td>
            <td class="border px-4 py-2">26</td>
            <td class="border px-4 py-2">14</td>
            <td class="border px-4 py-2">8</td>
            <td class="border px-4 py-2">4</td>
            <td class="border px-4 py-2">53</td>
            <td class="border px-4 py-2">32</td>
            <td class="border px-4 py-2">21</td>
            <td class="border px-4 py-2">50</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters,  } from 'vuex';

export default {
  data() {
    return {
      leagues: [
        { id: 152, name: "Premier League" },
        { name: "La Liga" },
        { name: "Serie A" },
        { name: "Bundesliga" },
        { name: "Ligue 1" },
        // { name: "Champions League" },
      ],
    };
  },
  computed: {
    ...mapGetters({
        standings: 'standings/standingsByLeague'
    })
  },
  mounted(){
    this.$store.dispatch('standings/getStandingsByLeague')
    console.log(process.env);
  },
};
</script>
