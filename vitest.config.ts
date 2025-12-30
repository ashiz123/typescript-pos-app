import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['tests/**/*.test.ts'],
    },
})

//  resolve: {
//         alias: {
//             '@src': path.resolve(__dirname, 'src'),
//             '@tests': path.resolve(__dirname, 'tests'),
//         },
//     },
