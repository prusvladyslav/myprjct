import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {getAllUsers, getUser} from "./query/user";
import {createUser} from "./mutations/user";

const App = () => {
    const {data, loading, error, refetch} = useQuery(getAllUsers)
    const {data:oneUser, loading: loadingOneUser} = useQuery(getUser, {
        variables: {
            id: 1
        }
    })
    const [newUser] = useMutation(createUser)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }
    const getAll = e => {
        e.preventDefault()
        refetch()
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
      <div>
        <form>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
          />
          <div >
            <button onClick={(e) => addUser(e)}>Создать</button>
            <button onClick={(e) => getAll(e)}>Получить</button>
          </div>
        </form>
        {users.map((user) => (
          <div>
            {user.username} {user.age}
          </div>
        ))}
        {/* <input onChange={e => setUsername(e.target.value)} value={username}> </input> */}
      </div>
    );
};

export default App;
