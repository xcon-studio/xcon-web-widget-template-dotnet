import { defineConfig } from 'vite';
import { xconVitePlugin } from '@xcons/vite-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// XCon Widget Development Configuration
// Optimized for TypeScript widget development with debug support
export default defineConfig({
    root: path.resolve(__dirname, 'scripts'),
    base: '/scripts',
    publicDir: false,

    server: {
        port: 4205,
        host: 'localhost',
        open: false,
        cors: true,
        strictPort: true,
        // XCon development server headers
        headers: {
            'X-XCon-Dev-Server': 'XCon Widget Development Kit',
            'X-Powered-By': 'XCon Studio'
        }
    },

    build: {
        // XCon Widget development build settings
        sourcemap: true,     // Essential for VS Code debugging
        minify: false,       // Keep code readable for development
        target: 'es2020'     // Modern browser target
    },

    esbuild: {
        target: 'es2020',
        keepNames: true,
        sourcemap: true
    },

    define: {
        'process.env.NODE_ENV': '"development"',
        'global': 'globalThis',
        '__XCON_DEV__': true,
        '__XCON_VERSION__': '"development"',
        '__XCON_WIDGET_DEV_KIT__': '"XCon Widget Development Kit"',
        '__XCON_BUILD_MODE__': '"development"'
    },

    css: {
        devSourcemap: true,  // CSS source maps for styling debug

        // XCon Widget CSS preprocessing
        preprocessorOptions: {
            scss: {
                additionalData: `// XCon Widget SCSS Development\n`
            }
        }
    },

    plugins: [
        // XCon Widget Development Plugin
        xconVitePlugin({
            development: true,
            sourceMap: true,
            minifyTemplates: false,
            minifyStyles: false,
            removeComments: false,
            preserveWhitespace: true,
            watchFiles: true,
            useTerser: false,
            logger: {
                enabled: true,
                level: 3, // DEBUG level for development
                prefix: 'XCon-Dev',
                timestamp: true,
                colors: true,
                logLevel: 'info'
            },
            showProcessedFiles: false // Keep console clean
        }),

        // XCon Development Enhancement Plugin
        {
            name: 'xcon-dev-enhancements',
            configureServer(server) {
                // XCon development server middleware
                // Custom startup message
                server.printUrls = () => {
                    console.log('\n🚀 XCon Widget Development Server')
                }
            },
            buildStart() {
                console.log('🔨 XCon Widget development build starting...')
            },
            buildEnd() {
                console.log('✅ XCon Widget development build completed!')
            }
        }
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'scripts'),
            '~xcon': path.resolve(__dirname, 'scripts'),
            '~': path.resolve(__dirname, 'scripts')
        }
    },

    optimizeDeps: {
        include: ['@xcons/widget'],
        force: false, // Don't force rebuild unless necessary

        esbuildOptions: {
            banner: {
                js: '// XCon Widget Dependencies - Development'
            }
        }
    },

    logLevel: 'info',
    clearScreen: false
});