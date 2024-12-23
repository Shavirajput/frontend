import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const addProject = () => {
    axios.post('http://localhost:5000/projects', newProject)
      .then(res => setProjects([...projects, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Projects</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
      />
      <button onClick={addProject}>Add Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.title} - {project.description} ({project.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
