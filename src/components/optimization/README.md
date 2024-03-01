## Optimize web performance
- Minifying css, js file
- Browser caching, header:
    - Set di header network
  ```ts
   // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600') 
  ```
    - OR redis
- Compress image to webp
- Lazy load, Code Splitting: hanya load komponen yg dibutuhkan React.lazy,
- Use CDN
- Server Side Rendering/SSG:

## Additional Reading
- RxDB (Reactive Database), Client-side reactive database library https://rxdb.info/
