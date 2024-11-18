const handleCheckout = async () => {
    // Construct comparison object
    const comparisonObject = {
      street: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postalCode: formData.zip_code,
    };
  
    // Find matching address
    const match = findMatchingAddress(sortedAddresses.value, comparisonObject);
    cartId.value = match ? match.id : cartId.value;
  
    // Build payload
    const payload = sortedAddresses.value?.length > 0
      ? { cartId: cartId.value, addressId: addressId.value }
      : {
          cartId: cartId.value,
          shippingAddress: { ...comparisonObject },
        };
  
    console.log("Payload:", payload);
  
    // Validation for form data completeness
    const isFormDataComplete =
      Object.values(comparisonObject).every((value) => value.length > 0) &&
      formData.email.length > 0;
  
    if (!isFormDataComplete) {
      toast.error("Billing address not complete", { timeout: 4000 });
      return;
    }
  
    // Create order and handle payments
    isLoading.value = true;
    try {
      const res = await adminStore.handleCreateOrders(payload);
      console.log("Order Response:", res);
  
      if (res?.status === 201) {
        const paymentPayload = {
          orderId: res.data?.order?.id,
          email: formData.email,
          amount: res.data?.order?.total,
        };
  
        console.log("Payment Payload:", paymentPayload);
  
        const paymentRes = await adminStore.handleMakePayments(paymentPayload);
        console.log("Payment Response:", paymentRes);
  
        if (paymentRes?.authorization_url) {
          window.location.href = paymentRes.authorization_url;
        }
      } else {
        toast.error("Failed to create order. Please try again.", { timeout: 4000 });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("An error occurred during checkout. Please try again.", { timeout: 4000 });
    } finally {
      isLoading.value = false; // Ensure loading state is reset
    }
  };

  const handleCheckout = async ()=>{
    // create order
   const payload = ref({})
   const comparisionObject =  {
       street: formData.address,
       city: formData.city,
       state: formData.state,
       country: formData.country,
       postalCode: formData.zip_code
   }
   let match = findMatchingAddress(sortedAddresses.value, comparisionObject)
   console.log(sortedAddresses.value[0], comparisionObject)
   cartId.value = match ? match.id : cartId.value
   if(sortedAddresses.value?.length > 0){
       payload.value = {
           "cartId": cartId.value,
           "addressId": addressId.value,
       }
   } else {
       payload.value = {
           "cartId": cartId.value,
           "shippingAddress": {
               "street": formData.address,
               "city": formData.city,
               "state": formData.state,
               "country": formData.country,
               "postalCode": formData.zip_code
           }
       }
   }
   console.log(payload.value)
   isLoading.value = true
   try {
       if(formData.address.length > 0 && formData.city.length > 0 && formData.state.length > 0 && formData.country.length > 0 && formData.zip_code.length > 0 && formData.email.length > 0) {
           // let res = await adminStore.handleCreateOrders(payload.value)
           // console.log(res)
           if(res?.status == 201 ){
               // let payload = {
               //     "orderId": res.data?.order?.id,
               //     "email": formData.email,
               //     "amount": res.data?.order?.total
               // };
               // console.log(payload)
               // let paymentRes = await adminStore.handleMakePayments(payload)
               // console.log(paymentRes)
               // if(paymentRes?.authorization_url){
               //     window.location.href = paymentRes?.authorization_url;
               // }
           } else {
               isLoading.value = false
               return
           }
           isLoading.value = false
       } else {
           toast.error("billing address not complete", {
           timeout: 4000,
         });
         isLoading.value = false
       }
   } catch (error) {
       console.log(error)
       isLoading.value = false
   }
}