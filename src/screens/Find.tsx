import React, { useState } from 'react'
import { Heading, useToast, VStack } from "native-base";
import { Header } from '../components/Header';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const toast = useToast()
    const {navigate} = useNavigation()

    async function handleJoinPoll() {
        if (!code.trim()) {
            toast.show({
                title: "Você precisa informar o código do bolão!",
                placement: 'top',
                bgColor: 'red.500'
            })
        }
        
        setIsLoading(true)

        try {
            await api.post('/polls/join', {code})

            toast.show({
                title: "Agora você faz parte deste bolão!",
                placement: 'top',
                bgColor: 'green.500'
            })

            navigate('polls')
        } catch (err) {
            console.log("Err", err)

            setIsLoading(false)

            if (err.response?.data?.message === 'Poll not found.') {
                return toast.show({
                    title: "Não foi possível encontrar um bolão com este código!",
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if (err.response?.data?.message === 'You already joined this poll.') {
                return toast.show({
                    title: "Você já está neste bolão!",
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: "Desculpe, erro ao pesquisar o bolão!",
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }
    return (
        <VStack  flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontrar o bolão através de{'\n'}
                    seu código único!
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    value={code}
                    onChangeText={setCode}
                    autoCapitalize="characters"
                />

                <Button 
                    title="Buscar bolão"
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}