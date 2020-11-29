import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Error, Repository } from './styles';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryType {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<RepositoryType[]>(() => {
    const repoSaved = localStorage.getItem('@github_explorer');

    if (!repoSaved) return [];

    return JSON.parse(repoSaved);
  });

  useEffect(() => {
    localStorage.setItem('@github_explorer', JSON.stringify(repositories));
  }, [repositories]);

  async function addNewRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<RepositoryType | undefined> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<RepositoryType>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro ao buscar o repositório');
    }
  }

  return (
    <>
      <Link to="/">
        <img src={Logo} alt="github explorer" />
      </Link>
      <Title>Explore repositório no Github.</Title>

      <Form hasError={!!inputError} onSubmit={addNewRepository}>
        <input
          placeholder="Digite aqui o nome de usuário"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {!!inputError && <Error>{inputError}</Error>}

      <Repository>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repository>
    </>
  );
};

export default Dashboard;
