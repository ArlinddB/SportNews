import axios from "axios";

export default {
    namespaced: true,

    state: {
        standingsByLeague: [],
    },
    getters: {
        standingsByLeague: (state) => state.standingsByLeague,
    },
    actions: {
        async getStandingsByLeague ({ commit }){
            const res = await axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=152&APIkey=46fcda134232acc023b5b2e53dddb66096d9f8c7ae7e0b2eaeea7548d40fdf5e`)

            const standings = res.data;

            commit('setStandingsByLeague', standings)
        }
    },
    mutations:{
        setStandingsByLeague(state, standings){
            state.standingsByLeague = standings;
        }
    }
}