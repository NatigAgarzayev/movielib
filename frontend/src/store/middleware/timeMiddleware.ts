import type { Middleware } from '@reduxjs/toolkit'

const timings = new Map<string, number>()

export const timeMiddleware: Middleware = () => (next) => (action: any) => {
    if (action.type.endsWith('/pending')) {
        const label = action.type.replace('/pending', '')
        timings.set(action.meta.requestId, performance.now())
        console.log(`[${label}] started`)
    }

    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
        const start = timings.get(action.meta.requestId)
        if (start) {
            const label = action.type.replace('/fulfilled', '').replace('/rejected', '')
            const duration = Math.round(performance.now() - start)
            console.log(`[${label}] took ${duration}ms`)
            timings.delete(action.meta.requestId)
        }
    }

    return next(action)
}