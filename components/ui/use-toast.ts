// Adapted from: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/use-toast.ts
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Toast = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastActionElement = React.ReactElement

export type ToastProps = {
  toast: ToasterToast
  className?: string
  style?: React.CSSProperties
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toastTimeouts.has(toast.id)) return

      const timeout = setTimeout(() => {
        toastTimeouts.delete(toast.id)
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))
      }, TOAST_REMOVE_DELAY)

      toastTimeouts.set(toast.id, timeout)
    })
  }, [toasts])

  const toast = useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      const id = genId()

      setToasts((prevToasts) => {
        const newToasts = [
          { id, ...props },
          ...prevToasts,
        ].slice(0, TOAST_LIMIT)

        return newToasts
      })

      return {
        id,
        dismiss: () => {
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
          )
        },
      }
    },
    []
  )

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      setToasts((prevToasts) =>
        toastId
          ? prevToasts.filter((toast) => toast.id !== toastId)
          : prevToasts
      )
    },
  }
}

export type { Toast, ToastActionElement }







