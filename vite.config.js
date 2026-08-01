import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
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
