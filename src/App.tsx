import './App.css'
import Header from './components/Header'
import GridCanvas from './components/Canva'
function App() {

  return (
    <>
      <Header />
      <div className='dates-villes'>
          <h2>Dates de tournée</h2>
          <ul>
            <li>15 janvier 2025 - <strong>Paris, France</strong></li>
            <li>18 janvier 2025 - <strong>Londres, Royaume-Uni</strong></li>
            <li>22 janvier 2025 - <strong>Berlin, Allemagne</strong></li>
            <li>25 janvier 2025 - <strong>Amsterdam, Pays-Bas</strong></li>
            <li>28 janvier 2025 - <strong>Milanx, Italie</strong></li>
            <li>1er février 2025 - <strong>Madrid, Espagne</strong></li>
            <li>4 février 2025 - <strong>Lisbonne, Portugal</strong></li>
            <li>10 février 2025 - <strong>New York, États-Unis</strong></li>
            <li>14 février 2025 - <strong>Los Angeles, États-Unis</strong></li>
            <li>18 février 2025 - <strong>Mexico City, Mexique</strong></li>
            <li>22 février 2025 - <strong>São Paulo, Brésil</strong></li>
            <li>25 février 2025 - <strong>Buenos Aires, Argentine</strong></li>
            <li>2 mars 2025 - <strong>Sydney, Australie</strong></li>
            <li>7 mars 2025 - <strong>Tokyo, Japon</strong></li>
            <li>10 mars 2025 - <strong>Séoul, Corée du Sud</strong></li>
            <li>14 mars 2025 - <strong>Shanghai, Chine</strong></li>
            <li>18 mars 2025 - <strong>Bangkok, Thaïlande</strong></li>
            <li>23 mars 2025 - <strong>Dubaï, Émirats arabes unis</strong></li>
            <li>28 mars 2025 - <strong>Le Caire, Égypte</strong></li>
            <li>2 avril 2025 - <strong>Johannesburg, Afrique du Sud</strong></li>
        </ul>
        <GridCanvas />
        <button>Acheter</button>
        <p>Copyright 2025 <a href="https://www.github.com/Enzoait">Enzo AIT-YAKOUB</a><a href="https://www.github.com/CaptainZiboo">Lucas POYART</a></p>
      </div>
    </>
  )
}

export default App
