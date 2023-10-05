import { createStore } from 'vuex';
import { fetch } from '../plugins/fetch';

const store = createStore({
    state () {
      return {
        transactions: [],
        fruits: [],
      }
    },
    getters: {
      transactions: state => state.transactions,
      fruits: state => state.fruits,
    },
    mutations: {
      setTransactions(state, transactions) {
        state.transactions = transactions;
      },
      setFruits(state, fruits) {
        state.fruits = fruits;
      },
    },
    actions: {
      async getAllTransactions({commit}) {
        try { 
          const {data: {transactions}} = await fetch({
            method: 'GET',
            url: '/api/transaction/list'
          })
          commit('setTransactions', transactions)              
        } catch (error) {
          console.log(error);
        }
      },
      async storeTransaction(_, order) {
        try { 
          await fetch({
            method: 'POST',
            url: '/api/transaction/buy',
            data: {
              order
            }
          })
        } catch (error) {
          console.log(error);
          alert("1 or more line items are out of stock. Please check your line items again");
        }
      },
      async getAllFruits({commit}) {
        try { 
          const {data: {fruits}} = await fetch({
            method: 'GET',
            url: '/api/fruits/list'
          })
          commit('setFruits', fruits)              
        } catch (error) {
          console.log(error);
        }
      },
    }
  })
  
  export default store;