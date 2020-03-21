import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);

    // carregar os dados do localStorage
    useEffect(
        () => setRepositories(JSON.parse(localStorage.getItem('repositories'))),
        []
    );

    // salvar os dados do localStorage
    useEffect(
        () =>
            localStorage.setItem('repositories', JSON.stringify(repositories)),
        [repositories]
    );

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form
                onSubmit={async e => {
                    e.preventDefault();

                    setLoading(true);

                    const response = await api.get(`/repos/${newRepo}`);

                    const data = {
                        name: response.data.full_name,
                    };

                    setRepositories([...repositories, data]);
                    setNewRepo('');
                    setLoading(false);
                }}
            >
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    type="text"
                    placeholder="Adicionar repositório"
                />

                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map(repository => (
                    <li key={repository.id}>
                        <span>{repository.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
};
