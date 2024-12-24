import { computed } from "vue";
import { useI18n } from "vue-i18n";


const useTranslate = () => {
    const { t } = useI18n();
    const getTranslate = (key: string) => {
        const keyTrans = computed(() => t(key));
        console.log(key, keyTrans.value)
        return keyTrans;
    };

    return {
        getTranslate,
    };
}


export default useTranslate
