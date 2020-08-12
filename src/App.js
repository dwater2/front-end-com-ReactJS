import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css'
import icone from './assets/dog-avatar2.jpg';

import Header from  './components/Header';

function App(){

  //const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handlerAdicionar(){
    //console.log(projects);
    //projects.push(`Novo Projeto ${Date.now()}`);
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    let novoProjeto = {
      title: "Back-end com Python",
      url: "http://www.git.com/repo02",
      techs: ["Python", "Django"],
      likes: 0
    }
    const response = await api.post('repositories', novoProjeto);
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title = "Homepage">
      </Header>

      <img width={100} src={icone}/>

      <ul>
        {projects.map(project => <li key={project.title}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handlerAdicionar}>Adicionar</button>
    </>
  );
}

export default App;