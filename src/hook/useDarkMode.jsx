import React, { useEffect, useState } from 'react'

export default function useDarkMode() {
    const [theme, setTheme] = useState(localStorage.theme)
    const colorTheme = theme==='dark'?'light':'dark'


    useEffect(()=>{


        localStorage.theme=theme
        
        document.documentElement.classList.add(theme)
        if(theme==='dark'){
            document.documentElement.classList.remove('light');
            
            let themeToggle = document.getElementById("themeToggle");
            if(themeToggle){
                themeToggle.checked=true
            }
            
        }
        if(theme==='light'){
            document.documentElement.classList.remove('dark')
        }

        
    },[theme])



    return [colorTheme,setTheme]
}
