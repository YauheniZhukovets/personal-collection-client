import React, {useMemo} from 'react';
import ReactDOMServer from 'react-dom/server';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import {Options} from 'easymde';


export const CustomMarkdownOptions = (text: string) => {
    return useMemo(() => {
        return {
            previewRender() {
                return ReactDOMServer.renderToString(
                    <ReactMarkdown
                        children={text}
                    />
                )
            },
        } as Options
    }, [])
}
