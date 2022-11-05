import React, { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../services/api';
import {Game, GameProps} from '../components/Game'
import { Loading } from './Loading';
import { EmptyMyPollList } from './EmptyMyPoolList';
interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([] as GameProps[])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const toast = useToast()

  async function fetchGames() {
    setIsLoading(true)

    try {
      const response = await api.get(`/polls/${pollId}/games`)

      setGames(response.data.games)

      console.log(response.data.games)

    } catch (err) {
      console.log('Err', err)
      toast.show({
          title: 'Não foi possível carregar os jogos!',
          placement: 'top',
          bgColor: "red.500"
      })
    } finally {
        setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    setIsLoading(false)

    try {
        if (!firstTeamPoints.trim() || !secondTeamPoints.trim() ) {
          return toast.show({
            title: 'Informe o placar dos dois times!',
            placement: 'top',
            bgColor: "red.500"
          })
        }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Seu palpite foi realizado. Agora é só torcer!',
        placement: 'top',
        bgColor: "green.500"
    })

    fetchGames()
    } catch (err) {
        console.log('Err', err)
        toast.show({
            title: 'Não foi possível salvar o seu palpite!',
            placement: 'top',
            bgColor: "red.500"
        })
    } finally {
        setIsLoading(false)
    }
}

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPollList code={code} /> }
    />
  );  
}
