import { Box, Typography } from "@mui/material"
import Dashboard from "@/components/dashboard"
import EnterpriseLayout from "@/components/EnterpriseLayout";


export const DashboardPage = () => {
    return (
        <EnterpriseLayout>
            <Box >
                <Typography variant="h4">Dashboard</Typography>
            </Box>


            <Box mt={2} mb={2}>
                <Dashboard />
            </Box>
        </EnterpriseLayout>
    )
}

export default DashboardPage;