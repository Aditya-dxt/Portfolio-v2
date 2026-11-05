import * as THREE from 'three/webgpu'

const text = `
 █████╗ ██████╗ ██╗████████╗██╗   ██╗ █████╗ 
██╔══██╗██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗
███████║██║  ██║██║   ██║    ╚████╔╝ ███████║
██╔══██║██║  ██║██║   ██║     ╚██╔╝  ██╔══██║
██║  ██║██████╔╝██║   ██║      ██║   ██║  ██║
╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝
                                              
██████╗ ██╗██╗  ██╗██╗████████╗               
██╔══██╗██║╚██╗██╔╝██║╚══██╔══╝               
██║  ██║██║ ╚███╔╝ ██║   ██║                  
██║  ██║██║ ██╔██╗ ██║   ██║                  
██████╔╝██║██╔╝ ██╗██║   ██║                  
╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝                  

╔═ Intro ═══════════════╗
║ Welcome to my 3D Portfolio!
║ I'm Aditya Dixit — Full-Stack Developer & AI Engineer.
║ I craft production-grade apps with AI at the core.
╚═══════════════════════╝

╔═ Socials ═══════════════╗
║ Mail       ⇒ adityadxt1910@gmail.com
║ GitHub     ⇒ https://github.com/Aditya-dxt
║ LinkedIn   ⇒ https://www.linkedin.com/in/aditya-dixit-085862333/
║ LeetCode   ⇒ https://leetcode.com/u/DEVELOPER-404/
║ HackerRank ⇒ https://www.hackerrank.com/profile/aditya_dxt
║ Instagram  ⇒ https://www.instagram.com/indeedaditya/
║ Calendly   ⇒ https://calendly.com/adityadxt1910/30min
╚═══════════════════════╝

╔═ Quick Stats ═════════╗
║ 300+ DSA Solved (LeetCode & HackerRank)
║ National Finalist — India Innovates 2026 (Bharat Mandapam)
║ 7+ Production Projects Shipped
║ Led teams across 6 national hackathons
╚═══════════════════════╝

╔═ Core Tech Stack ═════╗
║ Frontend ⇒ React, Next.js, TypeScript, Tailwind, Three.js
║ Backend  ⇒ Node.js, Express, FastAPI, MongoDB, PostgreSQL
║ AI / ML  ⇒ OpenAI & Gemini APIs, RAG, LangChain, PyTorch
║ Cloud    ⇒ Vercel, Render, Git, Docker
╚═══════════════════════╝

╔═ Debug ═══════════════╗
║ You can access debug mode by adding #debug to the URL and reloading.
║ Press [V] to toggle the free camera.
╚═══════════════════════╝
`
let finalText = ''
let finalStyles = []
const stylesSet = {
    letter: 'color: #ffffff; font: 400 1em monospace;',
    pipe: 'color: #60a5fa; font: 400 1em monospace;',
}
let currentStyle = null
for(let i = 0; i < text.length; i++)
{
    const char = text[i]

    const style = char.match(/[╔║═╗╚╝╔╝]/) ? 'pipe' : 'letter'
    if(style !== currentStyle)
    {
        currentStyle = style
        finalText += '%c'

        finalStyles.push(stylesSet[currentStyle])
    }

    finalText += char
}

export default [finalText, ...finalStyles]
