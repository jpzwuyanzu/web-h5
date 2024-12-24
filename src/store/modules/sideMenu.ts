import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideMenuStore = defineStore("sideMenu", () => {
    const languageSelect = ref('zh_CN') // languageSelect

    const setLanguageSelect = (value: string) => {
        languageSelect.value = value
    }

    return {
        languageSelect,
        setLanguageSelect
    }
}, {
    persist: true
})
