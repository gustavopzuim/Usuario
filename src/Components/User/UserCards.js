import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './UserCards.module.css';
import useForm from '../../Hooks/useForm';

function Cards(props) {
  const sidebar = (
    <ul>
      <section className={styles.sectioncard}>
        {props.users.map((user) => (
          <li key={user.id}>
            <div className={styles.card}>
              <div className={styles.container}>
                <h4 className={styles.name}>
                  <b>{user.name}</b>
                </h4>
                <p className={styles.repo}>repositorio: {user.id}</p>
                <a className={styles.detalhes} href="#">
                  Detalhes
                </a>
              </div>
            </div>
          </li>
        ))}
      </section>
    </ul>
  );
  return <div>{sidebar}</div>;
}
const UserCards = () => {
  const username = useForm();
  const [lista, setLista] = useState('');
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState('');
  const users = [...lista];

  async function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://api.github.com/users/${username.value}/repos`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.message === 'Not Found') {
          setStatus(false);
          setErro(true);
        } else {
          setLista(json);
          setStatus(true);
          setErro(false);
        }
        return json;
      });
  }
  return (
    <section className="animeLeft">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Busca de usuario para repositorio"
          placeholder="Digite o nome do usuario para repositorio"
          type="text"
          name="username"
          {...username}
        />
        <Button>Buscar</Button>
      </form>
      {status ? <Cards users={users} /> : <h2></h2>}
      {erro ? <h4>Usuario não foi encontrado</h4> : <p></p>}
    </section>
  );
};

export default UserCards;
