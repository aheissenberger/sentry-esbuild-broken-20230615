import { sentryEsbuildPlugin } from '@sentry/esbuild-plugin';
import esbuild from 'esbuild';
import { config } from "dotenv"
const outdir = 'outdir';
config()
esbuild.build({
  entryPoints: ['./src/index.ts'],
  outdir,
  format: 'cjs',
  platform: 'node',
  external: ['@sentry/node'],
  bundle: true,
  sourcemap: true, // Source map generation must be turned on
  plugins: [
    // Put the Sentry esbuild plugin after all other plugins
    sentryEsbuildPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,

      // Specify the directory containing build artifacts
      include: outdir,

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and need `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
      release: '1232312312',
    }),
  ],
});
