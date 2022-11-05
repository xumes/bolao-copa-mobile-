import React, {  useEffect, useState } from 'react'
import { Share } from 'react-native'
import { HStack, useToast, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { api } from '../services/api'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PollCardProps } from '../components/PoolCard'
import { PollHeader } from '../components/PoolHeader'
import { EmptyMyPollList } from '../components/EmptyMyPoolList'
import { Option } from '../components/Option'
import { Guesses } from '../components/Guesses'

interface RouteParams {
    id: string
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true)
    const [pollDetails, setPollDetails] = useState<PollCardProps>({} as PollCardProps)
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
    const route = useRoute()
    const {id} = route.params as RouteParams
    const toast = useToast()

    async function fetchPollDetails() {
        setIsLoading(true)

        try {
            const response = await api.get(`/polls/${id}`)
            setPollDetails(response.data.poll)
        } catch (err) {
            console.log('Err', err)
            toast.show({
                title: 'Não foi possível carregar este bolão',
                placement: 'top',
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: `Entre no meu bolão, aqui está o código: ${pollDetails.code}`
        })
    }

    useEffect(() => {
        fetchPollDetails()
    }, [id])

    if (isLoading) {
        return (<Loading />)
    }


    return (
        <VStack  flex={1} bgColor="gray.900">
            <Header title={pollDetails.title} showBackButton showShareButton onShare={handleCodeShare} />
            {
                pollDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PollHeader data={pollDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option
                            title="Seus palpites"
                            isSelected={optionSelected==='guesses'}
                            onPress={() => {setOptionSelected('guesses')}}
                        />
                        <Option
                            title="Ranking do grupo"
                            isSelected={optionSelected==='ranking'}
                            onPress={() => {setOptionSelected('ranking')}}
                        />
                    </HStack>

                    <Guesses pollId={pollDetails.id} code={pollDetails.code} />
                </VStack> 
                :
                <EmptyMyPollList code={pollDetails.code} />
            }

        </VStack>
    )

}