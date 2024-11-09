import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAnalytics } from '@/services/Analytics'

export const useAnalyticsStore = defineStore('analytics', ()=>{
    const analytics = ref({})

    const handleGetAnalytics = async ()=>{
        try {
            analytics.value = await getAnalytics()
            console.log(analytics.value)
            return analytics.value
        } catch (error) {
            console.log(error)
        }
    }

    return { 
        analytics,
        handleGetAnalytics
    }
})