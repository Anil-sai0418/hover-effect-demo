
import './App.css'



import SharePanel from './page'
import Register from './pages/Home'
import CrystalSphereBackground from './background/page'
import SkillsPage from './skills/Skills.jsx'

import Appleskills from './apple/Appleskills.jsx'
import ProjectPage from './projects/Projects.jsx'
import ContactPage from './contactme/Contactpage.jsx'
import BrandLogo from './logo/logo.jsx'
function App() {


  return (

    <div className='w-full min-h-screen '>


      {/* <GoogleAntigravityClone/> */}
      {/* <BrandLogo/> */}
      {/* <SharePanel/>
    <Register/> */}
      <CrystalSphereBackground/>
      <SkillsPage />
    
      <Appleskills/>
      <ProjectPage />
      <ContactPage/>  

    </div>
  )
}

export default App