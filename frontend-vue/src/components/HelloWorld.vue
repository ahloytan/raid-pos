<template>
  <div class="pt-5">
    <div class="container">
      <div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Line Items:</label>
          <input type="text" v-model="order" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <h1 class="py-3">Total: ${{ total }}</h1>
        <button type="submit" class="btn btn-primary" @click="submitTransaction">Submit</button>
      </div>
      <div class="mt-5">
        <h1>Price List</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fruit</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fruit in fruitsList" :key="fruit.id">
              <th scope="row">{{ fruit.id }}</th>
              <td>{{ fruit.fruit }}</td>
              <td>${{ fruit.price }}</td>
              <td>{{ fruit.remaining_quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="py-5">
        <h1>Transactions</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fruits</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactionsList" :key="transaction.id">
              <th scope="row">{{ transaction.id }}</th>
              <td>{{ transactionFruits(transaction) }}</td>
              <td>{{ transactionPrices(transaction) }}</td>
              <td>{{ transactionQuantity(transaction) }}</td>
              <td>${{ transaction.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      order: "apple x4 and banana x2"
    }
  },
  async mounted(){
    await this.getAllTransactions();
    await this.getAllFruits();
  },
  computed: {
  ...mapGetters(['transactions', 'fruits']),
    total() {
      let totalPrice = 0;
      const items = this.order.split('and ');
      for (let item of items) {
        let [fruit, quantity] = item.split(' ');
        quantity = parseFloat(quantity?.replace(/\D/g, ''));
        const [{ price } = { price: 1 }] = this.fruits?.filter(x => x.fruit.toLowerCase() === fruit.toLowerCase());
        totalPrice += quantity * price;
      }

      return totalPrice || 0;
    },
    transactionsList() {
      return this.transactions;
    },
    fruitsList() {
      return this.fruits;
    },
    transactionFruits() {
      return (transaction) => {
        return transaction.items_bought.map(item => item.fruit)
      }
    },
    transactionPrices() {
      return (transaction) => {
        return transaction.items_bought.map(item => item.price)
      }
    },
    transactionQuantity() {
      return (transaction) => {
        return transaction.items_bought.map(item => item.quantity)
      }
    }
  },
  methods: {
    ...mapActions(['getAllTransactions', 'storeTransaction', 'getAllFruits']),
    async submitTransaction() {
      if (!this.order) {
        alert("Please enter a line item");
        return;
      }
      await this.storeTransaction(this.order);  
      await this.getAllTransactions();
      await this.getAllFruits();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
