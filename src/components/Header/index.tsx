import { Background, LogoImg } from "./Header.style";
import erLogo from '../../assets/logo-rectangle.png';

interface HeaderProps {
    logo?: string | boolean;
}

export default function Header({logo}: HeaderProps){
    return (
        <Background>
            {logo && 
                <LogoImg
                    src={(typeof logo === 'string')? logo : erLogo}
                />
            }
        </Background>
    )
}