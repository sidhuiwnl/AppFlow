import Main from "@/components/Main.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";
function App() {



  return (
    <SidebarProvider>
        <AppSidebar
        />
        <SidebarTrigger/>
        <main className="w-screen flex justify-center items-center">

            <Main />
        </main>

    </SidebarProvider>
  )
}

export default App
