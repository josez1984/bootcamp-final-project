<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h5 class="headline mb-0 text-xs-center">Payment Methods</h5>            
      </div>
    </v-card-title>

    <v-card-text>
      <v-select
        :items="paymentMethodsList"
        label="Existing Payment Methods">
      </v-select>      
    </v-card-text>

    <v-card-title primary-title>
      <div>
        <h4 class="mb-0 text-xs-center">Add New Payment Method</h4>            
      </div>
    </v-card-title>

    <v-card-text>
      <div ref="card"></div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success"
        @click.prevent="handleSubmit">
          {{ btnSubmitText }}
      </v-btn>        
    </v-card-actions>
  </v-card>

</template>

<script>
  let stripe = Stripe('334342343434');
  let elements = stripe.elements();
  let card = elements.create('card');

  let style = {
    base: {
      border: '1px solid #D8D8D8',
      borderRadius: '4px',
      color: '#0000'
    }
  };

  export default {
    data: () => ({
      btnSubmitText: 'Add Payment Method',
      paymentMethodsList: []
    }),
    name: 'PaymentMethod',
    mounted: function() {     
      card.mount(this.$refs.card);
    },
    methods: {
      handleSubmit() {                     
        stripe.createToken(card).then(function(result) {
          console.log(result);
        })
      }
    }
  }
</script>

