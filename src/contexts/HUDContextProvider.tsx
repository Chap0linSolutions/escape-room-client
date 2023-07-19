import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import { Settings, LogOut, ArrowUpCircle, ArrowDownCircle } from 'react-feather';
import {
  RightSideContainer,
  OptionsContainer,
  InventoryContainer,
  SlotContainer,
  InventorySlot
} from '../components/HUD';
import { State } from '../gameLogic/state';


/** Não existe nenhum valor sendo passado nesse contexto por enquanto,
 *  isso quer dizer que isso poderia ser um componente e não um contexto.
 *  Fiz como contexto prevendo que vamos precisar expor alguns estados daqui
 *  quando implementarmos o timer, configurações e o botão de sair.
 *  Se isso não acontecer podemos transformar isso num componente simples.
 */
interface HUDContextValue {
}

const initialValues: HUDContextValue = {
};

const HUDContext = createContext<HUDContextValue>(initialValues);

interface HUDContextProviderProps {
  children: ReactNode;
}

export const HUDContextProvider = ({
  children,
}: HUDContextProviderProps) => {
  const [inventoryList, setInventoryList] = useState(Array(10).fill({}));
  const [inventoryPage, setInventoryPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const state = new State();

  useEffect(() => {
    state.setInventoryCallback(setInventoryList);
  }, [])

  const currentDisplayedInventory = inventoryList.slice(inventoryPage*5, (inventoryPage+1)*5 );

  const ToggleInventoryPage = () => {
    setInventoryPage((pv) => pv ? 0 : 1)
  }

  const SelectItem = (itemName: string | undefined) => {
    if (itemName && itemName !== selectedItem) {
      state.cb.showToast({
        title: `${itemName} selected`,
        description: '',
      })
      setSelectedItem(itemName);
      state.activeItem = inventoryList.find(item => item.name = itemName);
    } else {
      setSelectedItem(null);
      state.activeItem = null;
    }
  }
  
  const value: HUDContextValue = {};

  return (
    <HUDContext.Provider value={value}>
      {children}
      <RightSideContainer>
        <OptionsContainer>
          <Settings size={48} />
          <LogOut size={48} />
        </OptionsContainer>
        <InventoryContainer>
          <ArrowUpCircle size={48} onClick={ToggleInventoryPage} />
          <SlotContainer>
            {currentDisplayedInventory.map((item, index) => (
              <InventorySlot
                key={`slot-${index}`}
                item={item}
                selected={selectedItem && selectedItem === item.name}
                onClick={() => SelectItem(item.name)}
                />
            ))}
          </SlotContainer>
          <ArrowDownCircle size={48} onClick={ToggleInventoryPage} />
        </InventoryContainer>
      </RightSideContainer>
    </HUDContext.Provider>
  );
};

export const useHUDContext = (): HUDContextValue => {
  const context = useContext(HUDContext);
  return context;
};
