import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
     return {
     name: 'MERRYLOW',
     short_name: 'MERRYLOW',
     description: 'A campus-based food delivery platform',
     start_url: '/auth/sign-up',
     display: 'standalone',
     background_color: '#CB6CE6',
     theme_color: '#cb6ce6',
     icons: [
          {
               "src": "public/icons/manifest-icon-192.maskable.png",
               "sizes": "192x192",
               "type": "image/png",
               "purpose": "any"
          },
          {
               "src": "public/icons/manifest-icon-192.maskable.png",
               "sizes": "192x192",
               "type": "image/png",
               "purpose": "maskable"
          },
          {
               "src": "public/icons/manifest-icon-512.maskable.png",
               "sizes": "512x512",
               "type": "image/png",
               "purpose": "any"
          },
          {
               "src": "public/icons/manifest-icon-512.maskable.png",
               "sizes": "512x512",
               "type": "image/png",
               "purpose": "maskable"
          }
     ]
     }
}