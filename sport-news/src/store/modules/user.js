import logInUser from "@/firebase/user/logInUser";
import signUpUser from "@/firebase/user/signUpUser";

export default{
    namespaced: true,
    state:{
        user: null
    },
    getters: {
        user: (state) => state.user
    },
    actions:{
        async logInUser({commit}, payload){
            
            const user = await logInUser(payload);
        
            commit('setUser', user);
        },
        
        async registerUser({commit}, payload){
           signUpUser(payload);
        }
    },
    mutations:{
        setUser(state, user){
            state.user = user;
        }
    }
}