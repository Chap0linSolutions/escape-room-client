import { AppBackground } from "./Background.style";

interface BackgroundProps {
    children: React.ReactNode | React.ReactNode[];
}

export default function Background({children}: BackgroundProps){
    return (
        <AppBackground>
            {children}
        </AppBackground>
    )  
}