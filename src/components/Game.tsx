import React from 'react';
import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
  firstTeamPoints: string;
  secondTeampoints: string;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();

  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY [as] HH:mm[h]")

  const hasGameStarted = (new Date(data.date) <= new Date())

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
      pb={24}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
       {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          value={String(data.guess?.firstTeamPoints || "")}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          value={String(data.guess?.secondTeamPoints || "")}
        />
      </HStack>

      {
        !data.guess && hasGameStarted &&
        <Button size="xs" w="full" bgColor="red.200" mt={4} onPress={() => {}}>
          <HStack alignItems="center">
            <Text color="black" fontSize="xs" fontFamily="heading" mr={3}>
              Você só pode dar palpite antes do jogo começar
            </Text>

          </HStack>
        </Button>
      }

      {
        !data.guess && !hasGameStarted &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }

{
        data.guess &&
        <Button size="xs" w="full" bgColor="green.200" mt={4} onPress={() => {}}>
          <HStack alignItems="center">
            <Text color="black" fontSize="xs" fontFamily="heading" mr={3}>
              Palpite realizado, boa sorte!
            </Text>

          </HStack>
        </Button>
      }
    </VStack>
  );
}