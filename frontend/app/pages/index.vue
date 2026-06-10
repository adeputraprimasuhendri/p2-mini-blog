<template>
    <div class="blog-wrapper">
        <!-- Header Blog -->
        <header class="blog-header">
            <h1>Selamat Datang di Mini Blog</h1>
            <p class="subtitle">Berbagi cerita, teknologi, dan tutorial menarik.</p>
        </header>

        <main class="blog-content">
            <!-- 1. State Loading -->
            <div v-if="pending" class="state-message">
                <div class="spinner"></div>
                <p>Sedang memuat artikel terbaru...</p>
            </div>

            <!-- 2. State Error (Jika API Spring Boot mati/gagal diakses) -->
            <div v-else-if="error" class="state-message error">
                <p>⚠️ Gagal terhubung ke server. Pastikan Backend sudah berjalan.</p>
                <button @click="refresh" class="btn-retry">Coba Lagi</button>
            </div>

            <!-- 3. State Data Kosong -->
            <div v-else-if="!posts || posts.length === 0" class="state-message info">
                <p>Belum ada artikel yang dipublikasikan.</p>
            </div>

            <!-- 4. State Sukses Menampilkan Daftar Artikel -->
            <div v-else class="posts-grid">
                <article v-for="post in posts" :key="post.id" class="post-card">
                    <h2 class="post-title">{{ post.title }}</h2>
                    <p class="post-excerpt">{{ truncate(post.content) }}</p>
                    <NuxtLink :to="`/posts/${post.id}`" class="post-link">
                        Baca Selengkapnya →
                    </NuxtLink>
                </article>
            </div>
        </main>
    </div>
</template>

<script setup>
// Mengambil base URL API dari runtimeConfig di nuxt.config.ts
const config = useRuntimeConfig()

// Mengambil data dari backend Spring Boot
const { data: posts, pending, error, refresh } = await useFetch(`${config.public.apiBase}/posts`, {
    server: false
})

// Fungsi pembantu untuk memotong teks isi blog yang terlalu panjang
const truncate = (text) => {
    if (!text) return ''
    return text.length > 120 ? text.substring(0, 120) + '...' : text
}
</script>

<style scoped>
/* Pengaturan Layout Dasar */
.blog-wrapper {
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    color: #333;
}

.blog-header {
    text-align: center;
    margin-bottom: 40px;
}

.blog-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #111;
}

.subtitle {
    color: #666;
    font-size: 1.1rem;
}

/* Grid & Kartu Artikel */
.posts-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.post-card {
    padding: 24px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.post-title {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.5rem;
    color: #0076ff;
}

.post-excerpt {
    color: #555;
    line-height: 1.6;
    margin-bottom: 16px;
}

.post-link {
    display: inline-block;
    color: #0076ff;
    text-decoration: none;
    font-weight: 600;
}

.post-link:hover {
    text-decoration: underline;
}

/* Style untuk State (Loading/Error) */
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

.btn-retry {
    margin-top: 12px;
    padding: 8px 16px;
    background: #c53030;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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