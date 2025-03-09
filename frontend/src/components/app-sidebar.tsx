

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    // SidebarMenuButton,
    // SidebarMenuItem,
} from "@/components/ui/sidebar"



export function AppSidebar() {
    return (
        <Sidebar
            className="border-none"
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Recent Charts</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
