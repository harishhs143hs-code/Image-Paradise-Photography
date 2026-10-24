import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 9091,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: 9091,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog.html',
        blogPost: 'blog-post.html',
        preWedding: 'pre-wedding-shoot-chennai.html',
        chennai: 'wedding-photographer-chennai.html',
        ambattur: 'wedding-photographer-ambattur.html',
        avadi: 'wedding-photographer-avadi.html',
        tiruvallur: 'wedding-photographer-tiruvallur.html',
        videography: 'wedding-videography-chennai.html',
      },
    },
  },
});
