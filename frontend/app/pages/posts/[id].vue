<template>
    <div class="blog-wrapper">
        <nav class="blog-nav">
            <NuxtLink to="/" class="back-link">← Kembali ke Beranda</NuxtLink>
        </nav>

        <main class="blog-content">
            <div v-if="pending" class="state-message">
                <div class="spinner"></div>
                <p>Sedang membaca isi artikel...</p>
            </div>

            <div v-else-if="error || !post" class="state-message error">
                <p>⚠️ Artikel tidak ditemukan atau gagal memuat data dari server.</p>
                <NuxtLink to="/" class="btn-home">Kembali ke Home</NuxtLink>
            </div>

            <article v-else class="post-detail">
                <header class="post-header">
                    <h1 class="post-title">{{ post.title }}</h1>
                    <div class="post-meta">
                        <span class="meta-item">📅 {{ formatDate(post.createdAt) }}</span>
                        <span class="meta-item">👤 Oleh: Admin</span>
                    </div>
                </header>

                <hr class="divider" />

                <div class="post-body">
                    <p v-for="(paragraph, index) in post.content.split('\n')" :key="index">
                        {{ paragraph }}
                    </p>
                </div>
            </article>
        </main>
    </div>
</template>

<script setup>
// 1. Mengakses router untuk mengambil ID dari URL (misal: /posts/5 -> id = 5)
const route = useRoute()
const postId = route.params.id

// 2. Ambil URL API dari runtimeConfig
const config = useRuntimeConfig()

// 3. Fetch data spesifik artikel berdasarkan ID secara SSR
const { data: post, pending, error } = await useFetch(`${config.public.apiBase}/posts/${postId}`)

// 4. DINAMIS SEO: Judul tab browser akan berubah otomatis mengikuti judul artikel
useHead({
    title: post.value ? `${post.value.title} - Blog Saya` : 'Membaca Artikel...',
    meta: [
        {
            name: 'description',
            content: post.value ? post.value.content.substring(0, 150) : 'Detail artikel blog.'
        }
    ]
})

// Helper untuk mengubah format tanggal bawaan backend menjadi format lokal Indonesia
const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}
</script>

<style scoped>
/* Pengaturan Layout Dasar */
.blog-wrapper {
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 750px;
    margin: 0 auto;
    padding: 40px 20px;
    color: #333;
}

.blog-nav {
    margin-bottom: 30px;
}

.back-link {
    color: #0076ff;
    text-decoration: none;
    font-weight: 500;
}

.back-link:hover {
    text-decoration: underline;
}

/* Detail Artikel */
.post-header {
    margin-bottom: 20px;
}

.post-title {
    font-size: 2.3rem;
    line-height: 1.2;
    margin-bottom: 15px;
    color: #111;
}

.post-meta {
    display: flex;
    gap: 16px;
    color: #666;
    font-size: 0.95rem;
}

.divider {
    border: 0;
    border-top: 1px solid #e1e1e1;
    margin: 24px 0;
}

.post-body {
    font-size: 1.15rem;
    line-height: 1.75;
    color: #222;
}

.post-body p {
    margin-bottom: 20px;
    text-align: justify;
}

/* State Loader & Error */
.state-message {
    text-align: center;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
    color: #666;
}

.error {
    background: #fff5f5;
    color: #c53030;
    border: 1px solid #feb2b2;
}

.btn-home {
    display: inline-block;
    margin-top: 15px;
    padding: 8px 16px;
    background: #0076ff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}

.spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #0076ff;
    border-radius: 50%;
    margin: 0 auto 12px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>