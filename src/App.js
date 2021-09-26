//import getApis from './apis.json';
import Search from './components/Search';
import ApiItem from './components/ApiItem';
import Alert from './components/Alert';
import { useState, useEffect } from 'react';
import './style.css';


function App() {
  const [search, setSearch]=useState('');
  const [apis, setApis]=useState([]);

  useEffect(()=>{
    fetch('https://614de8c0e3cf1f001712d41a.mockapi.io/users')
    .then(res=>res.json())
    .then(data=>{setApis(data)
      
    })
  }, [])

  const filteredApis=apis.filter((api)=>api.name.toLowerCase().includes(search.toLocaleLowerCase())
  ); 

  const toggleBookmark=(id)=>{
    setApis(apis.map(api=>{
      if(api.id===id){
        api.bookmark=!api.bookmark;
      }
      return api;
    }));
  };


  return (
    <div className="App">
      <h3>A collective list of free APIs for use in <br /> software and web development.</h3>
      <Search search={search} setSearch={setSearch} placeholder="Find development, games, images APIs"/>
      <div className="container">
        <h4>Featured APIs of this week</h4>
        <div className="api-list">

          {filteredApis.map((api)=>(
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api}/>
          ))}
          {
            filteredApis.length===0 && <Alert message="API not found." />
          }
        
        </div>
      </div>
      <div className="container">
        <h4>Your Bookmarks</h4>
        <div className="api-list">

          {apis.filter((api)=>api.bookmark===true)
          .map((api)=>(
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api}/>
          ))}
          {apis.filter(api=>api.bookmark===true).length===0&&(
            <Alert message="There is no item on your Bookmark"/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
