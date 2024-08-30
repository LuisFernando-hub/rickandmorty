import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchEpisodes } from '../redux/sliceEpisodes';
import { AppDispatch, RootState } from '../redux/store';
import { Characters } from '../types/characters';
import { getBackgroundColor } from '../utils/getBackgroundColor';

interface Props {
  character: Characters | undefined;
}


export const Chart = ({ character }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { episodes, loading, error } = useSelector((state: RootState) => state.episodes);
  const characterID = "https://rickandmortyapi.com/api/character/" + character?.id;
  const color = getBackgroundColor(character?.name, true);

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  const characterAppearancesByMonth = useMemo(() => {
    if (!episodes) return [];

    const monthMap = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const appearances = monthMap.reduce<Record<string, number>>((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {} as Record<string, number>);


    episodes.forEach(episode => {
      if (episode.characters.includes(characterID)) {
        const airDate = new Date(episode.air_date);
        const month = monthMap[airDate.getMonth()];
        appearances[month]++;
      }
    });

    return Object.keys(appearances).map(month => ({
      month,
      "Meses do ano": appearances[month],
    }));
  }, [episodes, characterID]);

  console.log(characterAppearancesByMonth);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={310}
        data={characterAppearancesByMonth}
        margin={{
          top: 5,
          right: 30,
          left: 13,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Número de Aparições', angle: -90, position: 'center', dx: -35, dy: 0 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Meses do ano" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}
