import axios from "axios";

export default {
    namespaced: true,

    state: {
        standingsByLeague: [],
        isLoading: null
    },
    getters: {
        standingsByLeague: (state) => state.standingsByLeague,
        isLoading: (state) => state.isLoading,
    },
    actions: {
        async getStandingsByLeague ({ commit }, leagueId){
            commit('setIsLoading', true);

            const res = await axios.get(`${process.env.VUE_APP_FOOTBALL_API}?action=get_standings&league_id=${leagueId}&APIkey=${process.env.VUE_APP_FOOTBALL_API_KEY}`)

            const standings = res.data;
            
            if(standings.length == 0){
                commit('setIsLoading', true);
                return;
            }

            commit('setStandingsByLeague', standings)
            
            commit('setIsLoading', false);
        }
    },
    mutations:{
        setStandingsByLeague(state, standings){
            state.standingsByLeague = standings;
        },
        setIsLoading(state, isLoading){
            state.isLoading = isLoading;
        }
    }
}