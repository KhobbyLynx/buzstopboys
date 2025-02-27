import { useEffect, useCallback, RefObject } from 'react'

/**
 * Custom hook to handle outside clicks
 * @param ref - React ref of the target element
 * @param handler - Callback to trigger on outside click
 */
export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: () => void) => {
  const memoizedHandler = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    },
    [ref, handler]
  )

  useEffect(() => {
    document.addEventListener('mousedown', memoizedHandler)
    return () => document.removeEventListener('mousedown', memoizedHandler)
  }, [memoizedHandler])
}
