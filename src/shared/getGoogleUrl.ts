export const getGoogleOAuthUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri: process.env.REACT_APP_CLIENT_GOOGLE_REDIRECT as string,
        client_id: process.env.REACT_APP_CLIENT_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' ')
    }

    console.log({options})

    const qs = new URLSearchParams(options)

    console.log({qs})

    return `${rootUrl}?${qs.toString()}`
}