import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginForArco } from '@arco-plugins/vite-react'
import { visualizer } from 'rollup-plugin-visualizer'
import externalGlobals from 'rollup-plugin-external-globals'

// vite.config.ts
const { ANALYZE } = process.env
const cdnRoot = 'https://cdn.skypack.dev'

const productionPlugin = [
  {
    enforce: 'pre',
    transformIndexHtml(code) {
      const content = [
        'https://unpkg.com/react@18.2.0/umd/react.production.min.js',

        'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',

        'https://unpkg.com/localforage@1.10.0/dist/localforage.min.js',
      ]
      console.log('执行 UMD 替换')
      return code.replace(
        '<!-- GlobalScripts -->',
        content
          .map((i) => {
            return `<script crossorigin src='${i}'></script>`
          })
          .join(''),
      )
    },
  },
  externalGlobals({
    'react': 'React',
    'react-dom': 'ReactDOM',
    'localforage': 'localforage',
    // 非首页载入, 需要异步控制
    'react-instantsearch-hooks-web': 'ReactInstantSearchHooksDOM',
  }),
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode)
  return {
    // TODO chunk 碎片问题
    base: './',
    plugins: [
      react({
        // 配合 CDN 操作。。。。
        jsxRuntime: 'classic',
      }),
      vitePluginForArco({
        style: 'css',
      }),

      ANALYZE === '1'
        ? visualizer({ open: true, filename: 'visualizer/stat.html' })
        : false,
      ...(mode === 'production' ? productionPlugin : []),
    ],
    define: {
      __Search_Origin__: JSON.stringify(
        'https://meilisearch-konghayao.cloud.okteto.net/',
      ),
      __Search_Key__: JSON.stringify(
        '619f9717b59cbe35aa5883cb739f3133cff98ff439ddf8b2ed3cecf87004ec3c',
      ),
    },
    resolve: {
      alias: Object.assign(
        {
          '@meilisearch/instant-meilisearch':
            'https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js',
        },
        mode === 'production' && {
          'cnchar': `${cdnRoot}/cnchar`,
          'fuse.js': `${cdnRoot}/fuse.js`,
          'cnchar-trad': `${cdnRoot}/cnchar-trad`,
          'pangu': `${cdnRoot}/pangu`,
        },
      ),
    },
  }
})
