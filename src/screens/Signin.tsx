import React from 'react';
import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons'
import {useAuth} from '../hooks/useAuth'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';

export function SignIn() {
    const {signIn, isUserLoading} = useAuth()

    return (
        <Center flex={1} bgColor="black" p={7} alignItems="center" justifyContent="center">
            <Logo width={212} height={40} />
            <Text color="yellow.600" fontSize={24} fontFamily="heading" mt={4}>FIFA World Cup!</Text>
            <Button
                title='Entrar com Google'
                type='SECONDARY'
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
                mt={12}
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{_spinner: {color: 'white'}}}
            />
            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para a criação da sua conta.
            </Text>

        </Center>
    )
}