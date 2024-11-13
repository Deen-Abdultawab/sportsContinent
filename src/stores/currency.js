import { defineStore } from 'pinia';
import { reactive, provide, inject } from 'vue';

export const useCurrencyStore = defineStore('currency', ()=>{
    const currencyState = reactive({
      value: 'NGN',
      symbol: '₦',
    });
    
    const updateCurrencyState = (newValue) => {
      currencyState.value = newValue;
      switch (newValue) {
        case 'USD':
          currencyState.symbol = '$';
          break;
        case 'GBP':
          currencyState.symbol = '£';
          break;
        case 'NGN':
        default:
          currencyState.symbol = '₦';
          break;
      }
    };

    const getCurrencySymbol = (currencyCode) => {
      switch (currencyCode) {
         case 'USD':
            return '$';
         case 'GBP':
            return '£';
         case 'NGN':
            return '₦';
         default:
            return ''; // Default symbol if currency code is unknown
      }
   };
    
    const provideCurrency = () => {
      provide('currencyState', currencyState);
      provide('updateCurrencyState', updateCurrencyState);
    };
    
    const useCurrency = () => {
      const currencyState = inject('currencyState');
      const updateCurrencyState = inject('updateCurrencyState');
      if (!currencyState || !updateCurrencyState) {
        throw new Error('Currency state is not provided');
      }
      return { currencyState, updateCurrencyState };
    };
    
    return { 
        provideCurrency, 
        useCurrency,
        currencyState 
    };
})

