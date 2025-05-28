// "use client"
//
// import { useTheme } from "next-themes"
// import { Toaster as Sonner, ToasterProps } from "sonner"
//
// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme()
//
//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group z-50"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--secondary-main)",
//           "--normal-border": "var(--border)",
//         } as React.CSSProperties
//       }
//       {...props}
//     />
//   )
// }
//
// export { Toaster }





"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            position="top-center"
            className="custom-sonner"
            // toastOptions={{
            //     className: 'top-toast',
            // }}
            toastOptions={{
                className: 'custom-toast',
            }}
            style={
                {
                    // Blue-black color (adjust the HSL values as needed)
                    "--normal-bg": "hsl(220, 78%, 10%)", // Dark blue
                    "--normal-text": "hsl(0, 0%, 98%)",  // Nearly white text
                    "--normal-border": "hsl(220, 78%, 20%)", // Slightly lighter blue border

                    // Optional: Success/Error/Warning colors
                    // "--success-bg": "hsl(142, 71%, 10%)",
                    // "--error-bg": "hsl(0, 71%, 10%)",
                    // "--warning-bg": "hsl(38, 92%, 10%)",
                } as React.CSSProperties
            }
            // style={
            //     {
            //     } as React.CSSProperties
            // }
            {...props}
        />
    )
}

export { Toaster }