import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;

}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface TabProps {
    tabs: {
        tabLabel: string,
        tabChildren: React.ReactNode
    }[]
}



export default function BasicTabs(props: TabProps) {
    const { tabs } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        tabs.map((tab, index) => (
                            <Tab key={tab.tabLabel} label={tab.tabLabel} {...a11yProps(0)} />
                        )
                        )
                    }
                </Tabs>
            </Box>
            {
                tabs.map((tab, index) => (
                    <TabPanel key={"pannel-" + tab.tabLabel} value={value} index={index}>
                        {tab.tabChildren}
                    </TabPanel>
                ))
            }
        </Box>
    );
}
