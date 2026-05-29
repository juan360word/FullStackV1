
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
    
    <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
            <h1 className="text-4xl text-white font-bold ">Administrador de Productos</h1>
        </div>
    </header>

    <main className="mt-10 mx-auto max-w-6xl p-10 shadow-2xl shadow-black ">
       <Outlet/> 
    </main>
    
    </>
  )
}

export default Layout