// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Tambahkan konfigurasi ini untuk kebutuhan integrasi API Blog nanti
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080/api'
    }
  }
})