// esbuild.config.js
import { build } from 'esbuild'
import dotenv from 'dotenv'
dotenv.config()

const defineEnv = {
  'process.env.APP_NAME': JSON.stringify(process.env.APP_NAME),
  'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
}

build({
  entryPoints: ['./views/assets/js/index.js'],
  outfile: './public/assets/js/scripts.min.js',
  minify: true,
  bundle: true,
  sourcemap: true,
  define: defineEnv,
  target: ['es2020']
}).catch(() => process.exit(1))
