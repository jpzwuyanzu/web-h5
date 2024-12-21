import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTestStore = defineStore("test", () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    const setDoubleCount = (value: number) => {
        count.value = value
    }

    return {
        count,
        doubleCount,
        setDoubleCount
    }
}, {
    persist: true
})
