import { createI18n } from 'vue-i18n'
import zh_CN from "@/i18/zh_CN"
import en_US from "@/i18/en_US"
// Import default CSS

const messages = {
    en_US: { ...en_US },
    zh_CN: { ...zh_CN }
}

export default createI18n({
    locale: sessionStorage.getItem('locale') || 'zh_CN',
    messages
})