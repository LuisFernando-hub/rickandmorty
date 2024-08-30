import { List as MuiList, ListItem as MuiListItem, Drawer as MuiDrawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../redux/store';
import { useCallback, useEffect, useState } from 'react';
import { fetchCharacterById, fetchCharacters, setSelectedCharacterId } from '../redux/sliceCharacters';
import { getColor } from '../utils/getColor';
import { getBackgroundColor } from '../utils/getBackgroundColor';

interface Props {
  children: React.ReactNode;
}

const Root = styled.div`
  display: flex;
  padding: 0 !important;
  margin: 0 !important;
`;

const Drawer = styled(MuiDrawer)`
  width: 250px;
  padding: 0 !important;
  margin: 0 !important;

  .MuiDrawer-paper {
    width: 250px;
    padding: 0 !important;
    margin: 0 !important;
    background-color: #3a3a3a;
    overflow: hidden;
  }
`;

const Page = styled.div`
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
`;

const List = styled(MuiList)`
  background-color: yellow;
  margin: 0 !important;
  padding: 0 !important;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const ListItem = styled(MuiListItem)<{ $selected?: boolean; $name?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: ${(props) => getBackgroundColor(props.$name || '', props.$selected || false)};
`;

const ListItemText = styled.span<{ $selected?: boolean; $name?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) => getColor(props.$name || '', props.$selected || false)};
  font-weight: bold;
  padding: 0;
  margin: 0;
  text-align: center;
  height: 140px;
  width: 100%;
  cursor: pointer;
`;

export const Layout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, selectedCharacterId } = useSelector((state: RootState) => state.characters);
  const [characterIndex, setCharacterIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  useEffect(() => {
    if (characters.length > 0) {
      const characterId = characters[0]?.id;
      if (characterId) {
        dispatch(setSelectedCharacterId(characterId));
      }
    }
  }, [characters, dispatch]);


  const handleCharacterClick = (index: number, event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do clique.
    setCharacterIndex(index);
    const characterId = characters[index]?.id;
    if (characterId) {
      if (selectedCharacterId !== characterId) {
        dispatch(setSelectedCharacterId(characterId));
      }
    }
  };

  return (
    <Root>
      <Drawer variant="permanent" anchor="left">
        <List>
          {characters.map((character, index) => (
            <ListItem
              key={character.id}
              $selected={characterIndex === index}
              $name={character.name}
              onClick={(event) => handleCharacterClick(index, event)}
            >
              <ListItemText $selected={characterIndex === index} $name={character.name}>
                {character.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Page>{children}</Page>
    </Root>
  );
};
