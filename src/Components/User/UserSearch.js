import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './UserSearch.module.css';
import useForm from '../../Hooks/useForm';

function UserGit(props) {
  const sidebar = (
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>
          <h2>Usuario Encontrado:</h2>
          <h4>Id:</h4>
          <p>{user.id}</p>
          <h4>Login:</h4>
          <p>{user.login}</p>
          <h4>Tipo:</h4>
          <p>{user.type}</p>
        </li>
      ))}
    </ul>
  );
  return <div>{sidebar}</div>;
}
const UserSearch = () => {
  const username = useForm();
  const [login, setLogin] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState(false);
  const [erro, setErro] = useState(false);
  const users = [{ id: id, login: login, type: type }];

  async function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://api.github.com/users/${username.value}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          setStatus(true);
          setErro(false);
        } else {
          setStatus(false);
          setErro(true);
        }
        return response.json();
      })
      .then((json) => {
        setLogin(json.login);
        setId(json.id);
        setType(json.type);
        return json;
      });
  }
  return (
    <section className="animeLeft">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Busca de Usuario"
          placeholder="Digite o nome do usuario para busca"
          type="text"
          name="username"
          {...username}
        />
        <Button>Buscar</Button>
        {status ? <UserGit users={users} /> : <h2></h2>}
        {erro ? <h4>Usuario não foi encontrado</h4> : <p></p>}
      </form>
    </section>
  );
};

export default UserSearch;
