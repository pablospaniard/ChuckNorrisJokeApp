/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay, running = false) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])

  // keep the timeout dynamic by resetting it whenever its' deps change
  useEffect(() => {
    if (!running && delay !== null) {
      return () => clearInterval(savedCallback.current)
    }
  }, [delay, running])
}
