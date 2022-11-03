import React, { ReactNode, useState, useEffect } from 'react'
import { createContext } from "react";
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: UserProps
    isUserLoading: boolean
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthProviderProps){
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [user, setUser] = useState<UserProps>({} as UserProps)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "256246801702-8g9a5hmv469no2c1cnkq0pmc4upvcs2s.apps.googleusercontent.com",
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: [ 'profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserLoading(true)

            await promptAsync()
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(accessToken: string) {
        console.log("AccessToken => ", accessToken)
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>

        {children}

        </AuthContext.Provider>
    )
}
