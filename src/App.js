import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/bootstrap.min.css';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [obs, setObs] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const apiUrl = process.env.REACT_APP_API_URL; // Obtém a URL da variável de ambiente

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/users`, { name, phone, obs });
      clearForm();
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setObs('');
  };

  return (
    <div className="container mt-5">
      <h1>CRUD de Usuários</h1>

      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Observação:</label>
          <textarea
            className="form-control"
            rows="3"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Usuário
        </button>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.obs}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCrud;
