import type { PropsWithChildren } from "react"


const ErrorMsg = ({children} : PropsWithChildren) => {
  return (
    <>
    <div className=" text-center text-2xl bg-emerald-500 text-white font-bold rounded-xl p-2 mt-6 ">
        {children}
    </div>
    </>
  )
}

export default ErrorMsg