import type { Middleware } from '@reduxjs/toolkit';

export const timeMiddleware: Middleware = () => (next) => (action: any) => {
    if (action.type.endsWith('/pending')) {
        const start = performance.now();
        const label = action.type.replace('/pending', '');

        const result = next(action);

        action.meta._startTime = start;
        action.meta._label = label;

        return result;
    }

    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
        const start = action.meta?._startTime;
        const label = action.meta?._label;

        if (start && label) {
            const duration = Math.round(performance.now() - start);
            console.log(`[${label}] took ${duration}ms`);
        }
    }

    return next(action);
};