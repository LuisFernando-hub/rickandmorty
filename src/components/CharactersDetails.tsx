import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../redux/store"
import { TableComponent as Table } from "./Table"
import { useEffect, useState } from "react"
import { fetchCharacterByIdAPI } from "../api/charactersAPI"
import { Characters } from "../types/characters"
import { getBackgroundColor } from "../utils/getBackgroundColor"
import { Chart } from "./Chart"


const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #121212;
    color: #fff;
`

const CharacterName = styled.h6`
    font-size: 56px;
    padding: 3%;
    margin-left: 2% !important;
    font-weight: bold;
`

const CharacterTitleDetails = styled.h3<{ $selected?: boolean; $name?: string }>`
    padding: 2%;
    width: 100%;
    color: ${(props) => getBackgroundColor(props.$name || '', props.$selected || false)}
`

const CharacterImg = styled.img`
    display: flex;
    height: 100%;
    margin-right: 20% !important;
    border-radius: 50%;
`

export const CharactersDetails = () => {
    const selectedCharacterId = useSelector((state: RootState) => state.characters.selectedCharacterId);
    const [character, setCharacter] = useState<Characters>();

    useEffect(() => {
        async function fetchData() {
            if (selectedCharacterId != null) {
                const response = await fetchCharacterByIdAPI(selectedCharacterId);
                setCharacter(response);
            }
        }

        fetchData();

    }, [selectedCharacterId])



    return (
        <Container>
            <CharacterName>{character?.name}</CharacterName>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', padding: '3%', marginLeft: '8%',
                }}>
                    <CharacterTitleDetails
                        $selected={true}
                        $name={character?.name}
                    >
                        Dados do personagem
                    </CharacterTitleDetails>
                    <Table selectedCharacter={character} />

                    <CharacterTitleDetails
                        $selected={true}
                        $name={character?.name}
                        style={{ marginTop: '5%' }}
                    >
                        Aparições por mês
                    </CharacterTitleDetails>

                </div>
                <CharacterImg src={character?.image} alt="" />
            </div>
            <div style={{ position: 'relative', backgroundColor: '#2E2E2E', borderRadius: '0.5%', width: '62vw', height: '30%', marginLeft: '10%', marginTop: "-2%", padding: '30px' }}>
                <Chart character={character} />
            </div>

        </Container>
    )
}