import { Arrow, Bar, Slot } from "./Sidebar.style";
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather';

export default function Sidebar(){
    
    const slots = [...new Array(5)].map((a, i) => <Slot key={i}/>)
    console.log(slots)

    return (
        <Bar>
            <Arrow>
                <ArrowUpCircle size="40px" strokeWidth={1.2} color='#fffbee'/>
            </Arrow>
                {slots}
            <Arrow>
                <ArrowDownCircle size="40px" strokeWidth={1.2} color='#fffbee'/>
            </Arrow>
        </Bar>
    )
}