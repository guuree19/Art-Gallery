import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Gallery from './Gallery.js'
import ButtonBar from './ButtonBar.js'


function App( ){
  let [artId, setArtId] = useState(12720)
  let [data, setData] = useState({})
  const handleIterate = (e) => {
    setArtId(artId + Number(e.target.value))
  }


  useEffect(() => {
      document.title='Welcome to Artworld'
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
      .then(response => response.json())
      .then(resData => setData(resData))
  }, [artId])
  const imageDisplay = () => {
    if (!data.primaryImage) {
      return (
        <h2>No image found</h2>
      )
    }
    return (
      <Gallery objectImg={data.primaryImage} artist={data.artistDisplayName} title={data.title} />
    )
  }

  return (
    <div className="App">
      <div>{imageDisplay()}</div>
      <ButtonBar handleIterate={handleIterate} />
    </div>
  );
}




export default App;
