// components/ui/toaster.tsx
'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

// // components/ui/toast.tsx
// 'use client';

// import * as React from 'react';
// import { Cross2Icon } from '@radix-ui/react-icons';
// import * as ToastPrimitives from '@radix-ui/react-toast';
// import { cn } from '@/lib/utils';

// const Toast = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Root
//     ref={ref}
//     className={cn(
//       'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-gray-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
//       className
//     )}
//     {...props}
//   />
// ));
// Toast.displayName = ToastPrimitives.Root.displayName;

// const ToastClose = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Close>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Close
//     ref={ref}
//     className={cn(
//       'absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
//       className
//     )}
//     toast-close=""
//     {...props}
//   >
//     <Cross2Icon className="h-4 w-4" />
//   </ToastPrimitives.Close>
// ));
// ToastClose.displayName = ToastPrimitives.Close.displayName;

// const ToastTitle = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Title>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Title
//     ref={ref}
//     className={cn('text-sm font-semibold', className)}
//     {...props}
//   />
// ));
// ToastTitle.displayName = ToastPrimitives.Title.displayName;

// const ToastDescription = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Description>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Description
//     ref={ref}
//     className={cn('text-sm opacity-90', className)}
//     {...props}
//   />
// ));
// ToastDescription.displayName = ToastPrimitives.Description.displayName;

// type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

// type ToastActionElement = React.ReactElement<typeof ToastAction>;

// export {
//   type ToastProps,
//   type ToastActionElement,
//   ToastProvider,
//   ToastViewport,
//   Toast,
//   ToastTitle,
//   ToastDescription,
//   ToastClose
// };

// // components/ui/use-toast.tsx
// import * as React from 'react';

// import { ToastActionElement, type ToastProps } from '@/components/ui/toast';

// const TOAST_LIMIT = 1;
// const TOAST_REMOVE_DELAY = 1000000;

// type ToasterToast = ToastProps & {
//   id: string;
//   title?: React.ReactNode;
//   description?: React.ReactNode;
//   action?: ToastActionElement;
// };

// const actionTypes = {
//   ADD_TOAST: 'ADD_TOAST',
//   UPDATE_TOAST: 'UPDATE_TOAST',
//   DISMISS_TOAST: 'DISMISS_TOAST',
//   REMOVE_TOAST: 'REMOVE_TOAST',
// } as const;

// let count = 0;

// function genId() {
//   count = (count + 1) % Number.MAX_VALUE;
//   return count.toString();
// }

// type ActionType = typeof actionTypes;

// type Action =
//   | {
//       type: ActionType['ADD_TOAST'];
//       toast: ToasterToast;
//     }
//   | {
//       type: ActionType['UPDATE_TOAST'];
//       toast: Partial<ToasterToast>;
//     }
//   | {
//       type: ActionType['DISMISS_TOAST'];
//       toastId?: ToasterToast['id'];
//     }
//   | {
//       type: ActionType['REMOVE_TOAST'];
//       toastId?: ToasterToast['id'];
//     };

// interface State {
//   toasts: ToasterToast[];
// }

// const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// const addToRemoveQueue = (toastId: string) => {
//   if (toastTimeouts.has(toastId)) {
//     return;
//   }

//   const timeout = setTimeout(() => {
//     toastTimeouts.delete(toastId);
//     dispatch({
//       type: 'REMOVE_TOAST',
//       toastId: toastId,
//     });
//   }, TOAST_REMOVE_DELAY);

//   toastTimeouts.set(toastId, timeout);
// };

// export const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'ADD_TOAST':
//       return {
//         ...state,
//         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
//       };

//     case 'UPDATE_TOAST':
//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === action.toast.id ? { ...t, ...action.toast } : t
//         ),
//       };

//     case 'DISMISS_TOAST': {
//       const { toastId } = action;

//       if (toastId) {
//         addToRemoveQueue(toastId);
//       } else {
//         state.toasts.forEach((toast) => {
//           addToRemoveQueue(toast.id);
//         });
//       }

//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === toastId || toastId === undefined
//             ? {
//                 ...t,
//                 open: false,
//               }
//             : t
//         ),
//       };
//     }
//     case 'REMOVE_TOAST':
//       if (action.toastId === undefined) {
//         return {
//           ...state,
//           toasts: [],
//         };
//       }
//       return {
//         ...state,
//         toasts: state.toasts.filter((t) => t.id !== action.toastId),
//       };
//   }
// };

// const listeners: Array<(state: State) => void> = [];

// let memoryState: State = { toasts: [] };

// function dispatch(action: Action) {
//   memoryState = reducer(memoryState, action);
//   listeners.forEach((listener) => {
//     listener(memoryState);
//   });
// }

// interface Toast extends Omit<ToasterToast, 'id'> {}

// function toast({ ...props }: Toast) {
//   const id = genId();

//   const update = (props: ToasterToast) =>
//     dispatch({
//       type: 'UPDATE_TOAST',
//       toast: { ...props, id },
//     });
//   const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

//   dispatch({
//     type: 'ADD_TOAST',
//     toast: {
//       ...props,
//       id,
//       open: true,
//       onOpenChange: (open) => {
//         if (!open) dismiss();
//       },
//     },
//   });

//   return {
//     id: id,
//     dismiss,
//     update,
//   };
// }

// function useToast() {
//   const [state, setState] = React.useState<State>(memoryState);

//   React.useEffect(() => {
//     listeners.push(setState);
//     return () => {
//       const index = listeners.indexOf(setState);
//       if (index > -1) {
//         listeners.splice(index, 1);
//       }
//     };
//   }, [state]);

//   return {
//     ...state,
//     toast,
//     dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
//   };
// }

// export { useToast, toast };