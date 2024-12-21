import { createPinia } from 'pinia'
import { createPersistedState } from "pinia-plugin-persistedstate"

//piniaPersist 持久化

const pinia = createPinia()

pinia.use(createPersistedState({
    key: (id) => `__persisted__${id}`,
}),)

export default pinia